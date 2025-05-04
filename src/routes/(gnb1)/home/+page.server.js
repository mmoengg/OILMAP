import { SECRET_API_KEY } from '$env/static/private';
import { db, getDocs } from '$lib/firebase/firebase-admin';
import { collection } from 'firebase/firestore';
import { parseStringPromise } from 'xml2js';

export async function load({ locals }) {
    try {
        if (!locals.user) return {};

        const { uid } = locals.user;

        /**
         * 유저, 즐겨찾기 정보 가져오기
         */
        const [userSnap, favoritesSnap] = await Promise.all([db.collection('users').doc(uid).get(), db.collection('users').doc(uid).collection('favorites').limit(10).get()]);

        const user = userSnap.exists ? userSnap.data() : null;
        let favorites = favoritesSnap.docs.map((doc) => ({ ...doc.data() }));

        /**
         * 오늘의 유가 정보
         */
        // const oilReq = await fetch(`https://www.opinet.co.kr/api/avgAllPrice.do?out=xml&code=${SECRET_API_KEY}`, {
        //     method: 'GET',
        // });
        // const oilRes = await oilReq.text();

        // 오늘의 유가 테스트용 데이터 (실제 API 호출 대신 사용)
        const oilRes = `
		<?xml version="1.0" encoding="UTF-8"?>
        <RESULT>
            <OIL>
                    <TRADE_DT>20250503</TRADE_DT>
                    <PRODCD>B034</PRODCD>
                    <PRODNM>고급휘발유</PRODNM>
                    <PRICE>1909.13</PRICE>
                    <DIFF>-3.29</DIFF>
            </OIL>
            <OIL>
                    <TRADE_DT>20250503</TRADE_DT>
                    <PRODCD>B027</PRODCD>
                    <PRODNM>휘발유</PRODNM>
                    <PRICE>1639.70</PRICE>
                    <DIFF>+0.17</DIFF>
            </OIL>
            <OIL>
                    <TRADE_DT>20250503</TRADE_DT>
                    <PRODCD>D047</PRODCD>
                    <PRODNM>자동차용경유</PRODNM>
                    <PRICE>1506.73</PRICE>
                    <DIFF>-0.21</DIFF>
            </OIL>
            <OIL>
                    <TRADE_DT>20250503</TRADE_DT>
                    <PRODCD>C004</PRODCD>
                    <PRODNM>실내등유</PRODNM>
                    <PRICE>1309.95</PRICE>
                    <DIFF>+0.11</DIFF>
            </OIL>
            <OIL>
                    <TRADE_DT>20250503</TRADE_DT>
                    <PRODCD>K015</PRODCD>
                    <PRODNM>자동차용부탄</PRODNM>
                    <PRICE>1088.31</PRICE>
                    <DIFF>+0.29</DIFF>
            </OIL>
        </RESULT>`;

        // xml2js로 XML → JS 객체 변환
        const xmlObj = await parseStringPromise(oilRes);

        // 필요한 데이터 가공 (예시: OIL 배열 추출)
        const oilArr = xmlObj.RESULT.OIL.map((oil) => ({
            tradeDate: oil.TRADE_DT[0],
            prodName: oil.PRODNM[0],
            prodCode: oil.PRODCD[0],
            price: oil.PRICE[0],
            diff: oil.DIFF[0],
        }));

        /**
         * 유저 정보를 통해 즐겨찾기한 주유소의 오늘의 유가 정보를 가져오기
         * 1. 즐겨찾기한 주유소의 ID를 가져온다.
         * 2. 즐겨찾기한 주유소의 ID를 통해 오늘의 유가 정보를 가져온다.
         */
        const updatedFavorites = await Promise.all(
            favorites.map(async (favorite) => {
                const station_id = favorite.station_id;
                // const req = await fetch(`https://www.opinet.co.kr/api/detailById.do?code=${SECRET_API_KEY}&id=${station_id}&out=xml`);
                // const xmlText = await req.text();
                const xmlText = `
                <RESULT>
                    <SCRIPT id="allow-copy_script"/>
                    <script/>
                    <script/>
                    <OIL>
                    <UNI_ID>A0000978</UNI_ID>
                    <POLL_DIV_CO>GSC</POLL_DIV_CO>
                    <GPOLL_DIV_CO> </GPOLL_DIV_CO>
                    <OS_NM>플라트(주)서호주유소</OS_NM>
                    <VAN_ADR>서울 양천구 신월동 52-1</VAN_ADR>
                    <NEW_ADR>서울 양천구 남부순환로 317</NEW_ADR>
                    <TEL>02-2602-5172</TEL>
                    <SIGUNCD>0119</SIGUNCD>
                    <LPG_YN>N</LPG_YN>
                    <MAINT_YN>Y</MAINT_YN>
                    <CAR_WASH_YN>Y</CAR_WASH_YN>
                    <CVS_YN>N</CVS_YN>
                    <KPETRO_YN>N</KPETRO_YN>
                    <GIS_X_COOR>296517.01008</GIS_X_COOR>
                    <GIS_Y_COOR>549138.09694</GIS_Y_COOR>
                    <OIL_PRICE>
                    <PRODCD>D047</PRODCD>
                    <PRICE>1445</PRICE>
                    <TRADE_DT>20250502</TRADE_DT>
                    <TRADE_TM>080001</TRADE_TM>
                    </OIL_PRICE>
                    <OIL_PRICE>
                    <PRODCD>B034</PRODCD>
                    <PRICE>1944</PRICE>
                    <TRADE_DT>20250502</TRADE_DT>
                    <TRADE_TM>080001</TRADE_TM>
                    </OIL_PRICE>
                    <OIL_PRICE>
                    <PRODCD>B027</PRODCD>
                    <PRICE>1556</PRICE>
                    <TRADE_DT>20250502</TRADE_DT>
                    <TRADE_TM>080001</TRADE_TM>
                    </OIL_PRICE>
                    </OIL>
                </RESULT>`;
                const xmlObj = await parseStringPromise(xmlText);

                const oil = xmlObj.RESULT.OIL[0].OIL_PRICE.map((oil) => ({
                    trade_tm: oil.TRADE_TM[0],
                    trade_dt: oil.TRADE_DT[0],
                    price: oil.PRICE[0],
                    prodcd: oil.PRODCD[0],
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

        return {
            user: { ...user, favorites: favorites },
            oil: oilArr,
        };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { data: [] };
    }
}
