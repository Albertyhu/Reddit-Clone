import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'; 
import { getFirebaseConfig } from '../firebaseComponent.js';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';

const fireConfig = initializeApp(getFirebaseConfig())
const auth = getAuth() 

export const SignInWGoogle = () => {

    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
        .catch(e => console.log("Google Sign In Error: " + e.message))
}

export const SignUpWGoogle = async (setCurrentEmail, setUsername, setGoogleID, moveForward) => {
    var provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
        .then(result => {
            console.log("result")
            console.log(result.user.displayName)
            setCurrentEmail(result.user.email);
            setUsername(result.user.displayName.split(" ").join("_"));
            setGoogleID(result.user.uid); 
        })
        .then(()=>moveForward())
        //.then(() => moveForward())
        .catch(e => console.log("Google Sign In Error: " + e.message))
}

/*
export const SignUpWGoogle = ({ setCurrentUserData, addUserToList, setLoading, resetInput, closeGuestPanel }) => {
    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
        .then(async (result) => {
            await setDoc(doc(db, 'users', result.uid), {
                email: result.user.email,
                username: result.displayName.split(' ').join('_'),
                userID: result.uid
            })
            setCurrentUserData({
                email: result.user.email,
                username: result.displayName.split(' ').join('_'),
                userID: result.uid
            })
            addUserToList(result.displayName.split(' ').join('_'), result.user.email, result.uid); 
        })
        .catch(e => {
            alert("Google Sign In Error: " + e.message)

        })
    setLoading(false);
    resetInput();
    closeGuestPanel();
}*/

export const SignOut = () => {
    signOut(auth);
}