import { db } from '$lib/firebase/firebase'; // 클라이언트용 firebase 설정
import { serverTimestamp } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

export async function addHistory(uid, data) {
    // users/{uid}/histories 서브컬렉션에 새 문서 추가
    return await addDoc(collection(db, 'users', uid, 'histories'), {
        ...data,
        created: serverTimestamp() // 기록 생성일
    });
}
