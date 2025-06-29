import { SECRET_API_KEY } from "$env/static/private";
import { db } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const reqJson = await request.json();
        const uid = reqJson.userId
        const stationName = reqJson.stationName;

        /**
        * 상호로 주유소 검색
        */
        const searchReq =  await fetch(`https://www.opinet.co.kr/api/searchByName.do?code=${SECRET_API_KEY}&out=json&osnm=${stationName}`);
        const searchRes = await searchReq.json();
        // console.log('============ searchRes', searchRes.RESULT.OIL);

        const stationsSnap = await db.collection('users').doc(uid).collection('histories').orderBy('date', 'asc').limit(10).get();

        // function serializeFirestoreData(obj) {
        //     if (Array.isArray(obj)) {
        //         return obj.map(serializeFirestoreData);
        //     }
        //     if (obj && typeof obj === 'object') {
        //         // Timestamp 객체인지 확인
        //         if (typeof obj.toDate === 'function') {
        //             return obj.toDate().toISOString();
        //         }
        //         const newObj = {};
        //         for (const key in obj) {
        //             newObj[key] = serializeFirestoreData(obj[key]);
        //         }
        //         return newObj;
        //     }
        //     return obj;
        // }
        //
        // const history = historySnap.docs.map(doc => {
        //     const data = doc.data();
        //     return {
        //         ...serializeFirestoreData(data),
        //         id: doc.id
        //     };
        // });

        return json({ success: true, stations: searchRes.RESULT.OIL });
    } catch (error) {
        console.error('히스토리 불러오던 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
