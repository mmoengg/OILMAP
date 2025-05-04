// import { db } from '$lib/firebase/firebase-admin';
// import { redirect } from '@sveltejs/kit';

// export async function load({ locals }) {
//     if (!locals.user) return {};
//     const userDoc = await db.collection('users').doc(locals.user.uid).get();
//     return { user: userDoc.data() };

//     return {
//         user: {
//             ...userData,
//             uid: locals.user.uid,
//         },
//     };
// }
