import { SECRET_API_KEY } from "$env/static/private";
import { db, getDocs } from '$lib/firebase/firebase-admin';

export async function load({ locals, params }) {
    try {
        if (!locals.user) return {};
        const { id } = params;
        const { uid } = locals.user;

        /**
         * 유저, 관심 주유소 정보 가져오기
         */
        const [userSnap, favoritesSnap] = await Promise.all([db.collection('users').doc(uid).get(), db.collection('users').doc(uid).collection('favorites').limit(10).get()]);

        const user = userSnap.exists ? userSnap.data() : null;
        let favorites = favoritesSnap.docs.map((doc) => ({ ...doc.data() }));

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
            favorites: favorites,
            oil: oilRes.RESULT.OIL[0],
        };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { history: [] };
    }
}
