import { doc, setDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, storage } from '../firebaseComponent.js';
import { SampleCommunity, FunnyCommunity } from './dummyData.js';
import uuid from 'react-uuid'; 
import { getStorage } from 'firebase/storage'; 

const auth = getAuth(); 

export const UploadCommunities = async () => {
    FunnyCommunity.forEach(async item => {
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
            comunityTheme: item.communityTheme, 
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

/*
const SubmitEvent = async () => {
    const storageRef = StorageRef(storage, `banner/PeekingOver.jpg`);
    await uploadBytes(storageRef, PeekingOver).then((snapshot) => {
        alert('Uploaded a blob or file!');
    })
        .catch(error => { console.log(`${error.code}: ${error.message}`) });
}*/