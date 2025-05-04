import { adminAuth } from '$lib/firebase/firebase-admin';

export async function handle({ event, resolve }) {
    const sessionCookie = event.cookies.get('__session');

    if (sessionCookie) {
        try {
            // 세션 쿠키 검증
            const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
            event.locals.user = { uid: decodedClaims.uid, email: decodedClaims.email, nickname: decodedClaims.displayName };
        } catch (error) {
            // 쿠키가 유효하지 않으면 삭제
            event.cookies.delete('__session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return resolve(event);
}
