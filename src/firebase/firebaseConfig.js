import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj6YdHMBQnghCZU2uj-izRLtaNad_PMpM",
  authDomain: "wildlifehorizon-df5dc.firebaseapp.com",
  projectId: "wildlifehorizon-df5dc",
  storageBucket: "wildlifehorizon-df5dc.appspot.com",
  messagingSenderId: "670573873039",
  appId: "1:670573873039:web:a2f807cf2a443575482dfa",
  measurementId: "G-R5WRF30XT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app); // Initialize Firestore


const auth = getAuth(app);


export { db, auth }; // Export db