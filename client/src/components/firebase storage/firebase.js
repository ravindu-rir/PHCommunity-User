import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA8lvzTpWUfEZb04bmbVRMuvp7c_zGdUDQ",
    authDomain: "parenthood-community-lk.firebaseapp.com",
    projectId: "parenthood-community-lk",
    storageBucket: "parenthood-community-lk.appspot.com",
    messagingSenderId: "688919940654",
    appId: "1:688919940654:web:db8fec8f562d373548d9bf",
    measurementId: "G-7T53B77PSZ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);