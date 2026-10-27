import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const routeSource = await readFile(new URL('../app/api/proposals/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(routeSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function harness({ count, role, signedIn = true, failOwnerLookup = false }) {
  const log = [];
  const db = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() {
              log.push({ method: 'first', sql, args });
              if (sql.startsWith('SELECT COUNT')) return { count };
              if (sql.includes("role='owner'")) {
                if (failOwnerLookup) throw new Error('owner lookup failed');
                return role === 'owner' ? { id: args[0] } : null;
              }
              throw new Error('Unexpected read');
            },
            async run() { log.push({ method: 'run', sql, args }); return { success: true }; },
          };
        },
      };
    },
  };
  const exports = {};
  const context = {
    exports,
    module: { exports },
    require(name) {
      if (name === 'cloudflare:workers') return { env: { DB: db } };
      if (name === '../../chatgpt-auth') {
        return { getChatGPTUser: async () => signedIn ? { userId: 'signed-in-user' } : null };
      }
      if (name === '../../../lib/data') return {
        validOrigin: (req) => req.headers.get('origin') === new URL(req.url).origin,
        parseReport: () => ({
          device: 'J85', component: 'Boot', status: 'Partly working',
          version: 'test', summary: 'test', source: 'https://example.org/',
          specs: '{}', buildStage: 'Live boot',
        }),
      };
      throw new Error('Unexpected import: ' + name);
    },
    Response, URL, Date,
    crypto: { randomUUID: () => 'synthetic-id' },
  };
  vm.runInNewContext(compiled, context);
  const request = (origin = 'https://example.org') => new Request('https://example.org/api/proposals', {
    method: 'POST', headers: { origin, 'content-type': 'application/json' },
    body: JSON.stringify({ action: 'create', role: 'owner' }),
  });
  return { post: (origin) => exports.POST(request(origin)), log };
}

for (const role of ['contributor', 'moderator', 'owner']) {
  test(role + ' can submit without an application-level daily quota', async () => {
    const h = harness({ count: 1000, role });
    assert.equal((await h.post()).status, 201);
    const writes = h.log.filter((entry) => entry.method === 'run');
    assert.equal(writes.length, 1);
    assert.equal(writes[0].args[4], 'pending');
    assert.equal(writes[0].args[2], 'signed-in-user');
  });
}
test('authentication and origin checks still run', async () => {
  const anonymous = harness({ count: 0, role: 'owner', signedIn: false });
  assert.equal((await anonymous.post()).status, 401);
  const crossOrigin = harness({ count: 0, role: 'owner' });
  assert.equal((await crossOrigin.post('https://elsewhere.example')).status, 403);
  assert.equal(crossOrigin.log.length, 0);
});
