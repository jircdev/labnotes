import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX9Z0D8z5BMaXkN290Vlf-GK1u9PYRu1Y",
  authDomain: "labnotesreact.firebaseapp.com",
  databaseURL: "https://labnotesreact-default-rtdb.firebaseio.com",
  projectId: "labnotesreact",
 storageBucket: "labnotesreact.appspot.com",
  messagingSenderId: "458502185580",
  appId: "1:458502185580:web:f65767b08e7a47a39f6e49"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();





