// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNATlYbiis9F-CN1ijMURAS6zFlFP9mB0",
  authDomain: "test-b643e.firebaseapp.com",
  projectId: "test-b643e",
  storageBucket: "test-b643e.appspot.com",
  messagingSenderId: "8040525545",
  appId: "1:8040525545:web:5e6335b5aa8f73e94bca78",
  measurementId: "G-R7ZWJQ8CXF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
export { db };
