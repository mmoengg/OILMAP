import { SECRET_API_KEY } from "$env/static/private";
import { db } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const reqJson = await request.json();
        const latitude = reqJson.latitude; // y
        const longitude = reqJson.longitude // x
        const prodcd = reqJson.prodcd
        const radius = reqJson.radius
        const sort = reqJson.sort
        console.log('======== reqJson', reqJson)

        /**
        * 반경 내 주유소
        */
        const searchReq =  await fetch(`https://www.opinet.co.kr/api/aroundAll.do?code=${SECRET_API_KEY}&out=json&x=${longitude}&y=${latitude}&prodcd=${prodcd}&radius=${radius}&sort=${sort}`);
        const searchRes = await searchReq.json();
        console.log(`x=${longitude}&y=${latitude}&prodcd=${prodcd}&radius=${radius}&sort=${sort}`);
        console.log('============ searchRes', searchRes);

        return json({ success: true, stations: searchRes.RESULT.OIL });
    } catch (error) {
        console.error('현재 위치 주유소 불러오던 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
