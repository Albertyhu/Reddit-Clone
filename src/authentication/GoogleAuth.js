import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { getFirebaseConfig } from '../firebaseComponent.js';

const fireConfig = initializeApp(getFirebaseConfig())
const auth = getAuth() 

export const SignInWGoogle = () => {
    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
        .catch(e => console.log("Google Sign In Error: " + e.message))
}