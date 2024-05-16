import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDP7TcHnPKkNyi6tdlp8DjJVBc4PdwWcXM",
    authDomain: "esseeujali-fcbc2.firebaseapp.com",
    projectId: "esseeujali-fcbc2",
    storageBucket: "esseeujali-fcbc2.appspot.com",
    messagingSenderId: "811425826120",
    appId: "1:811425826120:web:28a10d9ecb6e8d3e285f7d"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)