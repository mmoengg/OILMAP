import { db } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const reqJson = await request.json();
        const uid = reqJson.userId

        const historySnap = await db.collection('users').doc(uid).collection('histories').where('delYn', '==', 'N').orderBy('date', 'asc').limit(10).get();

        function serializeFirestoreData(obj) {
            if (Array.isArray(obj)) {
                return obj.map(serializeFirestoreData);
            }
            if (obj && typeof obj === 'object') {
                // Timestamp 객체인지 확인
                if (typeof obj.toDate === 'function') {
                    return obj.toDate().toISOString();
                }
                const newObj = {};
                for (const key in obj) {
                    newObj[key] = serializeFirestoreData(obj[key]);
                }
                return newObj;
            }
            return obj;
        }

        const history = historySnap.docs.map(doc => {
            const data = doc.data();
            return {
                ...serializeFirestoreData(data),
                id: doc.id
            };
        });

        return json({ success: true, history: history });
    } catch (error) {
        console.error('히스토리 불러오던 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
