import { db } from '$lib/firebase/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';

export async function addHistory(uid, data) {
    // users/{uid}/histories 서브컬렉션에 새 문서 추가
    console.log('uid', uid)
    console.log('data', data)
    return await addDoc(collection(db, 'users', uid, 'histories'), {
        ...data,
        delYn: 'N',
        created: serverTimestamp() // 기록 생성일
    });
}

export async function editHistory(uid, historyId, data) {
    // users/{uid}/histories/{historyId} 문서 업데이트
    console.log('uid', uid)
    console.log('historyId', historyId)
    console.log('data', data)

    const historyRef = doc(db, 'users', uid, 'histories', historyId);
    console.log('historyRef', historyRef)
    await updateDoc(historyRef, {
        ...data,
        updated: serverTimestamp()
    });
}

export async function deleteHistory(uid, historyId) {
    // users/{uid}/histories/{historyId} 문서 삭제
    const historyRef = doc(db, 'users', uid, 'histories', historyId);
    await updateDoc(historyRef, {
        deleted: serverTimestamp(), // 삭제일 기록
        delYn: 'Y'
    }); 
    // 실제로 문서를 삭제하지 않고 deleted 필드만 업데이트
}