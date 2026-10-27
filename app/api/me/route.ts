import { getChatGPTUser } from '../../chatgpt-auth';
import { isModerator } from '../../../lib/data';
export const dynamic='force-dynamic';
export async function GET(){const user=await getChatGPTUser();return Response.json({signedIn:!!user,moderator:user?await isModerator(user.userId):false,siteUserId:user?.userId??null},{headers:{'Cache-Control':'no-store'}})}
