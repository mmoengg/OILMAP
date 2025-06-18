import { SECRET_API_KEY } from '$env/static/private';
import { db } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        const uid = url.searchParams.get('uid');
        console.log('로그인 처리 중 uid:', uid);

        /**
         * 유저, 관심 주유소 정보 가져오기
         */
        const [userSnap, favoritesSnap] = await Promise.all([db.collection('users').doc(uid).get(), db.collection('users').doc(uid).collection('favorites').limit(10).get()]);

        const user = userSnap.exists ? userSnap.data() : null;
        let favorites = favoritesSnap.docs.map((doc) => ({ ...doc.data() }));

        /**
         * 오늘의 유가 정보
         */
        const oilReq = await fetch(`https://www.opinet.co.kr/api/avgAllPrice.do?out=json&code=${SECRET_API_KEY}`, {
            method: 'GET',
        });
        const oilRes = await oilReq.json();

        // 필요한 데이터 가공 (예시: OIL 배열 추출)
        const oilArr = oilRes.RESULT.OIL.map((oil) => ({
            tradeDate: oil.TRADE_DT,
            prodName: oil.PRODNM,
            prodCode: oil.PRODCD,
            price: oil.PRICE,
            diff: oil.DIFF,
        }));

        /**
         * 유저 정보를 통해 즐겨찾기한 주유소의 오늘의 유가 정보를 가져오기
         * 1. 즐겨찾기한 주유소의 ID를 가져온다.
         * 2. 즐겨찾기한 주유소의 ID를 통해 오늘의 유가 정보를 가져온다.
         */
        const updatedFavorites = await Promise.all(
            favorites.map(async (favorite) => {
                const station_id = favorite.station_id;
                const req = await fetch(`https://www.opinet.co.kr/api/detailById.do?code=${SECRET_API_KEY}&id=${station_id}&out=json`);
                const jsonData = await req.json();
                console.log('//////////// 오늘의 유가 정보:', jsonData.RESULT.OIL);

                const oil = jsonData.RESULT.OIL[0].OIL_PRICE.map((oil) => ({
                    trade_tm: oil.TRADE_TM,
                    trade_dt: oil.TRADE_DT,
                    price: oil.PRICE,
                    prodcd: oil.PRODCD,
                })).sort((a, b) => {
                    return a.prodcd.localeCompare(b.prodcd);
                });

                return {
                    ...favorite,
                    oil_price: oil,
                };
            })
        );

        favorites = updatedFavorites;

        console.log('///////////// 로그인 처리 완료:', { user, favorites, uid });

        return json({
            success: true,
            user: { ...user, favorites: favorites, uid: uid },
        });
    } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        return json({ success: false, error: error.message }, { status: 401 });
    }
}
