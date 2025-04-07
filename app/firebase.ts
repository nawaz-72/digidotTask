// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoFlVucHcs9v-1894MrUVl2b9KQAJM50Q",
  authDomain: "digidottask.firebaseapp.com",
  projectId: "digidottask",
  storageBucket: "digidottask.firebasestorage.app",
  messagingSenderId: "552183641185",
  appId: "1:552183641185:web:e71f905c36f74cabd4a620",
  measurementId: "G-KRKE9CJ052"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };