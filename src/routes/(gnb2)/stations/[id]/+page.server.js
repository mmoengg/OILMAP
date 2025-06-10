import { SECRET_API_KEY } from "$env/static/private";
import { db } from '$lib/firebase/firebase-admin';

export async function load({ locals, params }) {
    try {
        if (!locals.user) return {};
        const { id } = params;
        console.log('id', id);

        /**
         * 상세 주유소 검색
         */
        const oilReq = await fetch(`https://www.opinet.co.kr/api/detailById.do?out=json&code=${SECRET_API_KEY}&id=${id}`, {
            method: 'GET',
        });
        const oilRes = await oilReq.json();
        console.log('oilRes', oilRes)

        return {
            user: locals.user,
            oil: oilRes.RESULT.OIL[0],
        };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { history: [] };
    }
}
