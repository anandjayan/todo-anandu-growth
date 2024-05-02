
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMCc9qgWstV_6ovOg0vSHoCx_AN_ryprg",
  authDomain: "todo-growth.firebaseapp.com",
  projectId: "todo-growth",
  storageBucket: "todo-growth.appspot.com",
  messagingSenderId: "438908007340",
  appId: "1:438908007340:web:b17ed5aebe13571af78009"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore();


export {auth, provider, db};