import { readable } from 'svelte/store';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const user = readable(undefined, (set) => onAuthStateChanged(auth, set));
