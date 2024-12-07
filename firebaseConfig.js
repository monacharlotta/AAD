// firebaseConfig.js
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Firebase configuration (replace with your Firebase project's config)
const firebaseConfig = {
    apiKey: "AIzaSyBOO0inMN8kSU8X53oap19D1R2b8sDwEIk",
    authDomain: "aad-koulu.firebaseapp.com",
    projectId: "aad-koulu",
    storageBucket: "aad-koulu.firebasestorage.app",
    messagingSenderId: "596582910174",
    appId: "1:596582910174:web:061135ef585146f47d5a4f",
    measurementId: "G-JQQ1L1JFLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };