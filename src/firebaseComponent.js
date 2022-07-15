// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseKey = `${process.env.REACT_APP_FIREBASE_KEY}`

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "react-clone-b735d.firebaseapp.com",
  projectId: "react-clone-b735d",
  storageBucket: "react-clone-b735d.appspot.com",
  messagingSenderId: "519265572243",
  appId: "1:519265572243:web:1f25d93b43d58e8591c466",
  measurementId: "G-96ZH6PK410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(); 
export { db, app}