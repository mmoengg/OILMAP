import { adminAuth, db } from '$lib/firebase/firebase-admin';
// import { adminAuth, db } from '$lib/server/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    try {
        // 클라이언트에서 받은 idToken
        const { idToken } = await request.json();

        // idToken 검증
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // 세션 쿠키 생성 (1일 유효)
        const expiresIn = 60 * 60 * 24 * 1 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        // 쿠키 설정
        const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };
        cookies.set('__session', sessionCookie, options);

        // 유저 데이터 확인 및 저장
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        // 유저 정보가 없으면 Firestore에 저장
        if (!userDoc.exists) {
            // 유저 정보 가져오기
            const userRecord = await adminAuth.getUser(uid);

            // Firestore에 저장
            await userRef.set({
                profile: {
                    nickname: userRecord.displayName || userRecord.email?.split('@')[0] || '',
                    email: userRecord.email || '',
                    photo_url: userRecord.photoURL || '',
                },
                settings: {
                    init_display: 'home',
                    primary_oil: '',
                    theme: 'white',
                },
            });
        }

        return json({ success: true });
    } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
