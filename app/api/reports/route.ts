import { allReports } from '../../../lib/data';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({reports:await allReports()},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({error:'Reports are temporarily unavailable.'},{status:503})}}
