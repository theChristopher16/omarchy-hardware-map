import {readFile,mkdir,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const [input,output]=process.argv.slice(2);
if(!input||!output){console.error('Usage: node export-tree.mjs EXPORT.json NEW_EMPTY_DIRECTORY');process.exit(2)}
const dest=path.resolve(output);await mkdir(dest,{recursive:true});if((await readdir(dest)).length)throw Error('Output directory must be empty.');
const data=JSON.parse(await readFile(input,'utf8'));if(data.schemaVersion!==1||!Array.isArray(data.reports))throw Error('Unrecognized export.');
function slug(value){return String(value||'unspecified').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'unspecified'}
for(const report of data.reports){if(!report.id||!report.component)throw Error('Report is missing id or component.');const parts=[slug(report.component),slug(report.specs?.componentVendor),slug(report.specs?.componentModel)];const folder=path.join(dest,...parts);await mkdir(folder,{recursive:true});const filename=slug(report.id)+'.json';await writeFile(path.join(folder,filename),JSON.stringify(report,null,2)+'\n',{flag:'wx'})}
console.log(`Exported ${data.reports.length} reports to ${dest}`);
