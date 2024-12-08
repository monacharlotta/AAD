// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration (replace with your Firebase project's config)
const firebaseConfig = {
    apiKey: "AIzaSyBOO0inMN8kSU8X53oap19D1R2b8sDwEIk",
    authDomain: "aad-koulu.firebaseapp.com",
    projectId: "aad-koulu",
    storageBucket: "aad-koulu.appspot.com",
    messagingSenderId: "596582910174",
    appId: "1:596582910174:web:061135ef585146f47d5a4f",
    measurementId: "G-JQQ1L1JFLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const db = getFirestore(app);

export { auth, db };