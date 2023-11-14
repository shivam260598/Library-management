import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBXxegKZo9Vh-mCaq6ywAFLfrHUcdzxlUA",
    authDomain: "book-management-app-737d2.firebaseapp.com",
    projectId: "book-management-app-737d2",
    storageBucket: "book-management-app-737d2.appspot.com",
    messagingSenderId: "387994342282",
    appId: "1:387994342282:web:64db1f476ec842da61ae73",
    measurementId: "G-CYWC43N2FK"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
