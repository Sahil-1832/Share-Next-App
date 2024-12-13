// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1LnUYEGWkoxC9L3BzjqN3J6de-k7CLUY",
  authDomain: "share-next-dfb4a.firebaseapp.com",
  projectId: "share-next-dfb4a",
  storageBucket: "share-next-dfb4a.appspot.com",
  messagingSenderId: "1092317721015",
  appId: "1:1092317721015:web:885a60af62f8aae6ff7832",
  measurementId: "G-RWC6QQPSW2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);