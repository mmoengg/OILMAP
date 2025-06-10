import { db } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const reqJson = await request.json();
        const uid = reqJson.userId

        const snapshot = await db
            .collection('users')
            .doc(uid)
            .collection('favorites')
            .where('station_id', '==', reqJson.stationId)
            .get();

        if (!snapshot.empty) {
            // 여러 개일 수 있으니 모두 삭제 (보통 하나만 존재)
            const batch = db.batch();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }

        return json( { success: true } );
    } catch (error) {
        console.error('관심 주유소 삭제 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
