// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-issue-tracker-81af4.firebaseapp.com",
  projectId: "my-issue-tracker-81af4",
  storageBucket: "my-issue-tracker-81af4.appspot.com",
  messagingSenderId: "748629460584",
  appId: "1:748629460584:web:7105a297f315d2701adddd",
  measurementId: "G-4KPSM2G987"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);