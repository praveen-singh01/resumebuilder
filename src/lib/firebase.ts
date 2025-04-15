import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | null = null;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Hardcoded Firebase config for development
// In production, you should use environment variables
const devConfig = {
  apiKey: "AIzaSyDzkVKeZW6bxMXZUmvr7EQALJc6kaYi6CY",
  authDomain: "resumebuilder-bf672.firebaseapp.com",
  projectId: "resumebuilder-bf672",
  storageBucket: "resumebuilder-bf672.firebasestorage.app",
  messagingSenderId: "382576213186",
  appId: "1:382576213186:web:37751dd876885fa91ccf5b",
  measurementId: "G-GMPHB5M4J1"
};

try {
  // Use environment variables if available, otherwise use dev config
  const configToUse = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || devConfig.apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || devConfig.authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || devConfig.projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || devConfig.storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || devConfig.messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || devConfig.appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || devConfig.measurementId,
  };

  // Initialize Firebase only in browser environment
  if (isBrowser) {
    // Check if Firebase is already initialized
    if (!getApps().length) {
      app = initializeApp(configToUse);
      console.log('Firebase initialized with config:', configToUse);
    } else {
      app = getApp();
      console.log('Using existing Firebase app');
    }

    // Initialize Auth and Firestore
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Analytics if supported
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized');
      } else {
        console.log('Firebase Analytics not supported in this environment');
      }
    }).catch(err => {
      console.error('Error checking Analytics support:', err);
    });
  } else {
    console.log('Firebase not initialized in server environment');
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create dummy objects to prevent runtime errors
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
}

export { app, auth, db, analytics };
