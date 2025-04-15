// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzkVKeZW6bxMXZUmvr7EQALJc6kaYi6CY",
  authDomain: "resumebuilder-bf672.firebaseapp.com",
  projectId: "resumebuilder-bf672",
  storageBucket: "resumebuilder-bf672.appspot.com",
  messagingSenderId: "382576213186",
  appId: "1:382576213186:web:37751dd876885fa91ccf5b",
  measurementId: "G-GMPHB5M4J1"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
