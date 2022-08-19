import React, { useState, useEffect, useCallback } from 'react'; 
import styled from 'styled-components'; 
import { collection, query, where, getDoc, getDocs, } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';
import { HomeContext } from '../components/contextItem.js'; 

import RenderFeed from '../feed/renderFeed.js';
//to be changed 
//import { sampleUser, threads, SampleCommunity } from '../helperTools/dummyData.js'; 

const Home = (props) => {
    const [threads, setThreads] = useState(null)
    const docRef = query(collection(db, "Threads"))

    const retrieveData = useCallback(async () => {
        var arr = []
        const snapshot = await getDocs(docRef)
            .catch(e => { console.log(`${e.code}: ${e.message}`) })
        snapshot.forEach(snap => {
            arr.push(snap.data())
        })
        setThreads(arr);
    }, [])

    const context = {
    } 
    
    useEffect(() => {
        if (threads === null || threads === undefined) {
            retrieveData(); 
        }
    }, [])


    return threads !== null && threads !== undefined && threads.length !== 0 ?
        <HomeContext.Provider value={context}>
            <RenderFeed
                data={threads}
                isCommunity={false}
            />
        </HomeContext.Provider>
        :
        null;
} 

export default Home; 