import { allReports } from '../../../lib/data';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({schemaVersion:1,exportedAt:new Date().toISOString(),note:'Approved community observations; independently verify each source.',reports:await allReports()},{headers:{'Cache-Control':'no-store','Content-Disposition':'attachment; filename="omarchy-hardware-export.json"'}})}catch{return Response.json({error:'Export unavailable'},{status:503})}}
