import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import admin from '$lib/firebase/firebase-admin'; // Admin SDK 초기화 파일

export async function load({ cookies }) {
    try {
        // 1. 쿠키에서 세션 토큰 추출
        const sessionCookie = cookies.get('session');
        if (!sessionCookie) return { history: [] };

        // 2. 토큰 검증으로 UID 얻기
        const decodedToken = await getAuth().verifySessionCookie(sessionCookie);
        const uid = decodedToken.uid;

        // 3. Firestore Admin 인스턴스
        const db = getFirestore();

        // 4. 서브컬렉션 쿼리
        const snap = await db.collection('users').doc(uid).collection('histories').get();

        // 5. 데이터 변환
        const history = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { history };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { history: [] };
    }
}

// import { db } from '$lib/firebase/firebase-admin.ts';
// import { UidIdentifier } from 'firebase-admin/auth';
// import { collection, getDocs } from 'firebase/firestore';

// export async function load() {
//     try {
//         const uid = UidIdentifier; // 현재 로그인한 사용자의 UID를 가져옵니다.
//         // Firebase users 컬렉션에서 데이터 가져오기
//         const snap = await getDocs(collection(db, 'users', UidIdentifier, 'histories'));

//         let history = [];

//         if (!snap.empty) {
//             history = snap.docs.map((doc) => ({
//                 ...doc.data(),
//             }));
//         }

//         return {
//             history: history,
//         };
//     } catch (error) {
//         console.error('데이터 불러오기 오류:', error);
//         return { data: [] };
//     }
// }
