import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE__FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE__FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE__FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE__FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE__FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE__FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
