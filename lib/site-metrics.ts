import { env } from 'cloudflare:workers';
export type MetricRow = {label:string;count:number};
export type SiteMetrics = {
  period:{days:number|null;from:string;through:string;timezone:string};
  traffic:{firstRecordedDay:string|null;pageViews:number|null;nodeSelections:number|null;sourceOpens:number|null;daily:{day:string;pageViews:number;nodeSelections:number;sourceOpens:number}[]};
  catalog:{publishedReports:number;deviceLabels:number;componentLabels:number;byOutcome:MetricRow[];byComponent:MetricRow[];byStage:MetricRow[]};
  moderation:{pending:number;approvedAllTime:number;rejectedAllTime:number;conflictAllTime:number;contributorsAllTime:number;submittedInPeriod:number;approvedInPeriod:number;rejectedInPeriod:number;conflictsInPeriod:number;oldestPendingAt:string|null};
  activeClaims:number;
};
export async function getSiteMetrics(days:number|null):Promise<SiteMetrics>{
 if(!env.DB)throw Error('Database unavailable');if(days!==null&&![7,30,90].includes(days))throw Error('Invalid period');const db=env.DB;
 const today=new Date(),from=days===null?'1970-01-01':new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()-(days-1))).toISOString().slice(0,10),until=today.toISOString();
 const queries=await Promise.all([
 db.prepare('SELECT COUNT(*) AS publishedReports,COUNT(DISTINCT lower(trim(device))) AS deviceLabels,COUNT(DISTINCT lower(trim(component))) AS componentLabels FROM reports WHERE archived_at IS NULL').first<{publishedReports:number;deviceLabels:number;componentLabels:number}>(),
 db.prepare('SELECT status AS label,COUNT(*) AS count FROM reports WHERE archived_at IS NULL GROUP BY status ORDER BY count DESC,label').all<MetricRow>(),
 db.prepare('SELECT component AS label,COUNT(*) AS count FROM reports WHERE archived_at IS NULL GROUP BY lower(trim(component)) ORDER BY count DESC,label').all<MetricRow>(),
 db.prepare('SELECT build_stage AS label,COUNT(*) AS count FROM reports WHERE archived_at IS NULL GROUP BY build_stage ORDER BY count DESC,label').all<MetricRow>(),
 db.prepare("SELECT COUNT(DISTINCT author_id) AS contributorsAllTime, SUM(CASE WHEN state='pending' THEN 1 ELSE 0 END) AS pending, SUM(CASE WHEN state='approved' THEN 1 ELSE 0 END) AS approvedAllTime, SUM(CASE WHEN state='rejected' THEN 1 ELSE 0 END) AS rejectedAllTime, SUM(CASE WHEN state='conflict' THEN 1 ELSE 0 END) AS conflictAllTime, SUM(CASE WHEN created_at>=? THEN 1 ELSE 0 END) AS submittedInPeriod, SUM(CASE WHEN state='approved' AND reviewed_at>=? THEN 1 ELSE 0 END) AS approvedInPeriod, SUM(CASE WHEN state='rejected' AND reviewed_at>=? THEN 1 ELSE 0 END) AS rejectedInPeriod, SUM(CASE WHEN state='conflict' AND reviewed_at>=? THEN 1 ELSE 0 END) AS conflictsInPeriod, MIN(CASE WHEN state='pending' THEN created_at END) AS oldestPendingAt FROM proposals").bind(from+'T00:00:00.000Z',from+'T00:00:00.000Z',from+'T00:00:00.000Z',from+'T00:00:00.000Z').first<Record<string,number|string|null>>(),
 db.prepare('SELECT COUNT(*) AS n FROM claims c JOIN reports r ON r.id=c.report_id WHERE c.expires_at>? AND r.archived_at IS NULL').bind(until).first<{n:number}>(),
 db.prepare('SELECT day,page_views AS pageViews,node_selections AS nodeSelections,source_opens AS sourceOpens FROM traffic_daily WHERE day>=? ORDER BY day DESC').bind(from).all<{day:string;pageViews:number;nodeSelections:number;sourceOpens:number}>(),
 db.prepare('SELECT MIN(day) AS firstRecordedDay FROM traffic_daily').first<{firstRecordedDay:string|null}>(),
 ]);
 const [catalog,outcomes,components,stages,moderation,claims,daily,first]=queries;
 const rows=daily.results||[],firstDay=first?.firstRecordedDay??null,sum=(field:'pageViews'|'nodeSelections'|'sourceOpens')=>firstDay?rows.reduce((total,row)=>total+Number(row[field]),0):null;
 const n=(key:string)=>Number(moderation?.[key]??0);
 return {period:{days,from,through:until,timezone:'UTC'},traffic:{firstRecordedDay:firstDay,pageViews:sum('pageViews'),nodeSelections:sum('nodeSelections'),sourceOpens:sum('sourceOpens'),daily:rows},catalog:{publishedReports:catalog?.publishedReports??0,deviceLabels:catalog?.deviceLabels??0,componentLabels:catalog?.componentLabels??0,byOutcome:outcomes.results,byComponent:components.results,byStage:stages.results},moderation:{pending:n('pending'),approvedAllTime:n('approvedAllTime'),rejectedAllTime:n('rejectedAllTime'),conflictAllTime:n('conflictAllTime'),contributorsAllTime:n('contributorsAllTime'),submittedInPeriod:n('submittedInPeriod'),approvedInPeriod:n('approvedInPeriod'),rejectedInPeriod:n('rejectedInPeriod'),conflictsInPeriod:n('conflictsInPeriod'),oldestPendingAt:typeof moderation?.oldestPendingAt==='string'?moderation.oldestPendingAt:null},activeClaims:claims?.n??0};
}
