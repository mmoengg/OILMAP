import { db } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const reqJson = await request.json();
        const uid = reqJson.userId
        let stationData = {
            station_id: reqJson.stationId,
            station_name: reqJson.stationName,
            station_poll: reqJson.pollDivCd
        }

        await db.collection('users').doc(uid).collection('favorites').add(stationData);

        return json( { success: true } );
    } catch (error) {
        console.error('관심 주유소 등록 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
