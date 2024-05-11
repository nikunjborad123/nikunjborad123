import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'nikunj-borad.firebaseapp.com',
  projectId: 'nikunj-borad',
  storageBucket: 'nikunj-borad.appspot.com',
  messagingSenderId: '283749360638',
  appId: '1:283749360638:web:fdc293b108bd0dca7456af',
  measurementId: 'G-TW71GPVPGF'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);