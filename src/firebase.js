// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDk1GEjfEUcG5SXAwX4iL0uCuqqgL_dfgM",
    authDomain: "equipe8ql.firebaseapp.com",
    projectId: "equipe8ql",
    storageBucket: "equipe8ql.appspot.com",
    messagingSenderId: "1036761644513",
    appId: "1:1036761644513:web:821babac5399047c38a6a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};