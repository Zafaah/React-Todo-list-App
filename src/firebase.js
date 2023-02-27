// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBVXRLUkPu4iSgoCApC6GKPoP9Q973Dax0",
   authDomain: "todo-app-64198.firebaseapp.com",
   projectId: "todo-app-64198",
   storageBucket: "todo-app-64198.appspot.com",
   messagingSenderId: "428067928635",
   appId: "1:428067928635:web:4d62d1af4599f992ebfa1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)