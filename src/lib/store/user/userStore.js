import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';

// user
export const userStore = writable(null);

onAuthStateChanged(auth, (user) => {
    userStore.set(user);
});

// userData
export const userData = writable(null);

export const fetchUserData = async (uid) => {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
        userData.set(snap.data());
    }
};
