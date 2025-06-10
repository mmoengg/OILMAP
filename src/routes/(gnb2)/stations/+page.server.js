import { db } from '$lib/firebase/firebase-admin';

export async function load({ locals }) {
    try {
        if (!locals.user) return {};

        return {
            user: locals.user,
        };
    } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        return { history: [] };
    }
}
