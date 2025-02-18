import admin from 'firebase-admin';
import serviceAccount  from './serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

const db = admin.firestore();
export { db }
