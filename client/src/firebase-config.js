// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8lvzTpWUfEZb04bmbVRMuvp7c_zGdUDQ",
  authDomain: "parenthood-community-lk.firebaseapp.com",
  projectId: "parenthood-community-lk",
  storageBucket: "parenthood-community-lk.appspot.com",
  messagingSenderId: "688919940654",
  appId: "1:688919940654:web:db8fec8f562d373548d9bf",
  measurementId: "G-7T53B77PSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = grtAuth();
export const provider = new GoogleAuthProvider();