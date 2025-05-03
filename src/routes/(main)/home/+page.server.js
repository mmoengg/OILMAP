import { SECRET_API_KEY } from '$env/static/private';
import { db } from '$lib/firebase/firebase-admin.ts';
import { parseStringPromise } from 'xml2js';

export async function load() {
    try {
        // Firebase users 컬렉션에서 데이터 가져오기
        const snapshot = await db.collection('users').get();

        // 오늘의 유가 정보 가져오기
        // const oilReq = await fetch(`https://www.opinet.co.kr/api/avgAllPrice.do?out=xml&code=${SECRET_API_KEY}`, {
        //     method: 'GET',
        // });
        // const oilRes = await oilReq.text();
        // console.log('///// oilRes:', oilRes);

        /* 테스트용 */
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

        return {
            user: snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })),
            oil: oilArr,
        };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { data: [] };
    }
}
