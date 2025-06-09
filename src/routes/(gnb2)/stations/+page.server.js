import { db } from '$lib/firebase/firebase-admin';

export async function load({ locals }) {
    try {
        if (!locals.user) return {};
        const { uid } = locals.user;

        /* 실제 데이터 사용 시 */


        /* 가데이터 사용 시 */
        // const history = [
        //     {
        //         id: 2,
        //         date: '2025-05-07T22:39:57.165Z',
        //         station_name: '서호플라트',
        //         station_oil: '휘발유',
        //         station_price: 1526,
        //         amount: 23154,
        //         station_liter: 12,
        //         station_poll: 'GSC',
        //     },
        //     {
        //         id: 1,
        //         date: '2025-05-05T22:39:57.165Z',
        //         station_name: '서호플라트',
        //         station_oil: '휘발유',
        //         station_price: 1596,
        //         amount: 13254,
        //         station_liter: 9.3,
        //         station_poll: 'GSC',
        //     },
        // ];

        return {
            user: locals.user,
        };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { history: [] };
    }
}
