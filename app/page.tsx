import { getChatGPTUser } from './chatgpt-auth';
import FieldGuide from './ui';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getChatGPTUser();return <FieldGuide signedIn={!!user}/>}
