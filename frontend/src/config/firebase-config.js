// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeDLlAKFpn1ul5D0kaKX4B_MCuGG1Zv7I",
  authDomain: "craftconnect-3c6b8.firebaseapp.com",
  projectId: "craftconnect-3c6b8",
  storageBucket: "craftconnect-3c6b8.appspot.com", // Correct storage bucket format
  messagingSenderId: "172602906450",
  appId: "1:172602906450:web:d46669758f52a946d00c8b",
  measurementId: "G-C23J1BLVD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional, if you want to use analytics)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app); // Initialize Firebase Storage

// Now you can use Firebase Authentication, Firestore, and Storage in your app
export { app, analytics, auth, db, storage }; // Export storage along with other services
