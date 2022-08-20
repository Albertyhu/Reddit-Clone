import { doc, setDoc, collection, query, where, getDocs, Timestamp, runTransaction } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebaseComponent.js';
import { SampleCommunity, FunnyCommunity, LosAngelesCommunity  } from './dummyData.js';
import uuid from 'react-uuid'; 
import { getStorage } from 'firebase/storage'; 
import { genKey } from '../components/randGen.js'; 

const auth = getAuth(); 

export const UploadCommunities = async () => {
    SampleCommunity.forEach(async item => {
        var DateCreated = new Date(item.dateCreated);
        var dateCreatedTS = Timestamp.fromDate(DateCreated)
        var obj = {
            communityTitle: item.communityTitle,
            communityID: item.communityID, 
            communityImage: item.communityImage, 
            members: item.members, 
            member: item.customNamedMembers, 
            onlineMembers: item.onlineMembers, 
            dateCreated: dateCreatedTS, 
            communityHeaderTitle: item.communityHeaderTitle, 
            communityTheme: item.communityTheme, 
            description: item.description, 
            rules: item.rules, 
            moderators: item.moderators, 
        }
        await setDoc(doc(db, 'Communities', item.communityID), obj)
            .catch(error => {
                console.log(`${error.code}: ${error.message}`)
            })
    })
} 

export const AddCommunities = async () => {
    const docRef = collection(db, "users")

    try {
        await runTransaction(db, async (transaction) => {
            const snapshot = await transaction.get(docRef);
            if (!snapshot.exists()) {
                throw "Document does not exist!"; 

            }

            transaction.update(docRef, {communityMembership: []})
        })
    }
    catch (e){ console.log(`Transaction failed. ${e.code}: ${e.message}`)}
}

/*
const SubmitEvent = async () => {
    const storageRef = StorageRef(storage, `banner/PeekingOver.jpg`);
    await uploadBytes(storageRef, PeekingOver).then((snapshot) => {
        alert('Uploaded a blob or file!');
    })
        .catch(error => { console.log(`${error.code}: ${error.message}`) });
}*/