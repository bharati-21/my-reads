import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCXIjlLpEhTMh_zK1O3Cn75upKZ0lh8OGk",
    authDomain: "myreadsapp-5dad1.firebaseapp.com",
    projectId: "myreadsapp-5dad1",
    storageBucket: "myreadsapp-5dad1.appspot.com",
    messagingSenderId: "263688901764",
    appId: "1:263688901764:web:a0a6d4ded78c9d42755ed1",
    measurementId: "G-SREEFHB8K2"
};

//  initi firebase
initializeApp(firebaseConfig);

// init FireStore
const db = getFirestore();

// init firestore auth
const auth = getAuth();

export { db, auth };