import { env } from 'cloudflare:workers';
export type Specs = {componentVendor?:string;componentModel?:string;deviceVendor?:string;architecture?:string;cpu?:string;gpu?:string;memory?:string;wifi?:string;firmware?:string};
export type Report = {id:string;device:string;component:string;status:string;version:string;summary:string;source:string;createdAt:string;kind:string;specs:Specs;buildStage:string};
export const examples: Omit<Report,'specs'|'buildStage'>[] = [
 {id:'source-1',device:'ASUS TUF FX505DU',component:'Input devices',status:'Workaround reported',version:'3.4.2',summary:'A user reported a Makima virtual input device loop and described a workaround. Review the issue and your configuration before making changes.',source:'https://github.com/basecamp/omarchy/issues/4951',createdAt:'2026-03-09',kind:'Source report'},
 {id:'source-2',device:'Framework Laptop 12',component:'Installer',status:'Workaround reported',version:'3.0.1–3.0.2',summary:'A user reported an installer error after removing the USB when prompted; one attempt leaving it inserted did not show the error.',source:'https://github.com/basecamp/omarchy/issues/2215',createdAt:'2025-10-04',kind:'Source report'},
 {id:'source-3',device:'Intel Macs',component:'Wi-Fi and keyboard',status:'Documented support',version:'See current manual',summary:'The Omarchy manual describes installer support for selected Intel Mac hardware and lists known limitations.',source:'https://github.com/omacom/omarchy/blob/quattro/manual/44-mac-support.md',createdAt:'',kind:'Documentation'}
];
export async function allReports(): Promise<Report[]> {
 if (!env.DB) throw new Error('Database unavailable');
 const result=await env.DB.prepare('SELECT id, device, component, status, version, summary, source, created_at AS createdAt, kind, specs, build_stage AS buildStage FROM reports WHERE archived_at IS NULL ORDER BY created_at DESC LIMIT 500').all();
 return (result.results as unknown as (Omit<Report,'specs'>&{specs:string})[]).map(r=>({...r,specs:JSON.parse(r.specs||'{}')}));
}
export function parseReport(v:unknown) {
 if (!v || typeof v !== 'object') throw Error('Invalid report');
 const o=v as Record<string,unknown>; const field=(k:string,max:number)=>{const x=o[k]; if(typeof x!=='string'||!x.trim()||x.trim().length>max) throw Error(`Please provide ${k} (up to ${max} characters).`); return x.trim()};
 const device=field('device',100), component=field('component',80), status=field('status',40), version=field('version',80), summary=field('summary',1200), source=field('source',1000);
 if(!['Working','Partly working','Not working','Workaround reported','Investigating','Documented support'].includes(status)) throw Error('Choose a valid outcome.');
 try {const u=new URL(source); if(!['http:','https:'].includes(u.protocol)) throw Error();} catch {throw Error('Provide a valid HTTP or HTTPS source link.');}
 const buildStage=typeof o.buildStage==='string'?o.buildStage:'Unknown'; if(!['Unknown','Researching','Boot blocked','Live boot','Installed','In use','Blocked','Ready'].includes(buildStage))throw Error('Choose a valid build stage.');
 const specs:Specs={}; for(const key of ['componentVendor','componentModel','deviceVendor','architecture','cpu','gpu','memory','wifi','firmware'] as const){const value=o[key];if(value!==undefined&&typeof value!=='string')throw Error('Invalid specifications.');if(typeof value==='string'){if(value.trim().length>160)throw Error(`${key} is too long.`);if(value.trim())specs[key]=value.trim()}}
 return {device,component,status,version,summary,source,buildStage,specs:JSON.stringify(specs)};
}
export async function isModerator(userId:string){if(!env.DB)return false;return !!(await env.DB.prepare('SELECT id FROM moderators WHERE id=?').bind(userId).first());}
export function validOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
