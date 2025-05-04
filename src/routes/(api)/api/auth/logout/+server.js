import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
    cookies.delete('__session', { path: '/' });
    return json({ success: true });
}
