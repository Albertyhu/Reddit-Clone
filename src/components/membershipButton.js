import React, { useContext, useRef, useEffect, useState } from 'react'; 
import { db } from '../firebaseComponent.js';
import { updateDoc, doc, arrayUnion, arrayRemove, runTransaction } from 'firebase/firestore'; 
import { AppContext } from './contextItem.js'; 
import styled, { ThemeProvider } from 'styled-components'; 

const RenderMemberShipButtons = props => {
    const {
        isMember,
        setIsMember,
        communityID, 
        communityTheme,
    } = props; 
    const {
        normalMode,
        DefaultTheme,
        DarkTheme, 
        currentUserData, 
        useCommunityTheme, 
        setCurrentUserData,
        addMembership, 
        removeMembership, 
    } = useContext(AppContext)

    const LeaveButtonRef = useRef(); 
    const [ButtonText, setButtonText] = useState('Joined')

    const onmouseoverEvent = event => {
        if (LeaveButtonRef.current && LeaveButtonRef.current.contains(event.target)) {
            setButtonText('Leave');
        }
        else {
            setButtonText('Joined');
        }
    } 

    useEffect(() => {
        document.addEventListener('mouseover', onmouseoverEvent);
        return () => document.removeEventListener('mouseover', onmouseoverEvent);
    }, [])

    if (!currentUserData) {
        return null;
    }

    return (<ThemeProvider theme={normalMode ? (useCommunityTheme ? (!!communityTheme ? communityTheme : DefaultTheme) : DefaultTheme) : DarkTheme}>
        {isMember ?
            <Button
                className= "invertedButton"
                onClick={() => { LeaveCommunity(currentUserData.userID, communityID, setIsMember, removeMembership) }}
                ref={LeaveButtonRef}
            >{ButtonText}</Button>
            :
            <Button
                className = "invertedButton"
                onClick={() => { JoinCommunity(currentUserData.userID, communityID, setIsMember, addMembership) }}>Join Community</Button>
        }
    </ThemeProvider>)
}       

export default RenderMemberShipButtons; 

//I was testing out the Firebase runTransaction method. It doesn't have to be written this way. 
export const JoinCommunity = async (userID, communityID, setIsMember, addMembership) => {
    const docRef = doc(db, "users", userID); 
    try {
        await runTransaction(db, async (transact) => {
                const newData = await transact.get(docRef);
                transact.update(docRef, {
                    communityMembership: arrayUnion(communityID),
                })
                addMembership(communityID)
                setIsMember(true)
        })
    } catch (e) {
        console.error(e)
    }
}

export const LeaveCommunity = async (userID, communityID, setIsMember, removeMembership) => {
    const docRef = doc(db, "users", userID);
    try {
        await runTransaction(db, async (transact) => {
            transact.update(docRef, {
                    communityMembership: arrayRemove(communityID),
            })
            removeMembership(communityID)
            setIsMember(false)
        })
    } catch (e) {
        console.log(`${e.code}: ${e.message}`)
    }
}


const Button = styled.div`
    width: 100%; 
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: unset;
    padding-top: 10px;
    padding-bottom: 10px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    background-color: ${props => props.theme.ButtonBackgroundC || "#ffffff"}; 
    color: ${props => props.theme.ButtonTextC || "#000000"}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover || "#d5d5d5"}; 
    }
    &.invertedButton{
        background-color: ${props => props.theme.InvertedButtonBackgroundC || "#ffffff"}; 
        color: ${props => props.theme.InvertedButtonTextC || "#000000"}; 
        border: 1px solid ${props => props.theme.InvertedButtonTextC || "#000000"}; 
    }
    &.invertedButton:hover{
        background-color: ${props => props.theme.InvertedButtonBackgroundCHover || "#d5d5d5"}; 
    }
    &.communityOptionsButton{
        border: none; 
        background-color: rgba(0,0,0,0); 
        display: flex; 
        justify-content: space-around;
        color: ${props => props.theme.TextColor};
    }
    &.communityOptionsButton:hover{
        background-color: rgba(0,0,0,0.1);
    }
    &#MessageModButton{
        background-color: rgba(0,0,0,0);
        border: ${props => props.theme.MessageButtonBorder};
        justify-content: center;
        color: ${props => props.theme.LinkColor};
        padding-top: 5px;
        padding-bottom: 5px;
        display: grid; 
        grid-template-columns: 30% 70%;
    }
    &#MessageModButton:hover{
        background-color: rgba(0,0,0,0.1);
     }
    &#MessageModButton > span{
        margin: auto 5px;
        color: ${props => props.theme.MessageButtonColor};
        text-align: left;
    }  
    &#MessageModButton > #MailWrapper{
        text-align: right;
    }
        &#MessageModButton > *{
        margin-top: auto;
        margin-bottom: auto;
    }  
`