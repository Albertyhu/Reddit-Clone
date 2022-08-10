import { doc, setDoc, collection, query, where, getDoc } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';
import { getAuth } from 'firebase/auth';
import { AppContext } from '../components/contextItem.js';


const auth = getAuth(); 

export const retrieveUserData = async (ID, storeData) => {
    const docRef = doc(db, "users", ID); 
    const docSnap = await getDoc(docRef); 
    if (docSnap.exists()) {
        var obj = {...docSnap.data()}
        return obj;
    }
    else {
        console.log('User doesn\'t exsits'); 
    }
}