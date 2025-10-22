import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6fcgX_upS4Dg_zqdVzrkzJ9BXdQS29q4",
    authDomain: "memorial-page.firebaseapp.com",
    databaseURL: "https://memorial-page-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memorial-page",
    storageBucket: "memorial-page.firebasestorage.app",
    messagingSenderId: "545455300581",
    appId: "1:545455300581:web:0655ada03c0c950f10d90c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
