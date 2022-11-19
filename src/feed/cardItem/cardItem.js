import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext, CardContext  } from '../../components/contextItem.js'; 
import { RenderVerticalVoting } from '../../components/votingComponent.js'; 
import RenderPostFooter from '../../thread/postFooter.js'; 
import { Divider } from '../../global/styledComponents.js'; 
import RenderRIcon from '../../asset/icons/r_icon.js'; 
import { SampleCommunity } from '../../helperTools/dummyData.js';
import { RenderTimePosted } from '../../components/renderTimePosted.js'; 
import { useNavigate } from "react-router-dom";
import { Serialize } from '../../components/slateJSComponents/serializer.js'; 
import { JoinCommunity } from '../../components/membershipButton.js'; 
import {
    MainContainer,
    VotingColumn,
    MainColumn, 
    Button,
    CommunityTitleWrapper, 
    ComunityTitleSecondaryWrapper, 
    CommunityTitle, 
    Author, 
    TimePosted, 
    ThreadTitle, 
    BodyText, 
} from './cardStyle.js'; 

const RenderCardItem = props => {
    const { normalMode,
        DefaultTheme,
        DarkTheme,
        currentUserData,
        addMembership, 
    } = useContext(AppContext);

    const {
        community, 
        communityID, 
        threadID,
        title,
        flair, 
        authorName, 
        textBody, 
        awards, 
        timePosted, 
        votes, 
        commentNumber, 

        //threadIndex is the index of the current thread in the sorted array in renderAllComments.js 
        threadIndex, 
        sortedArray, 
        dispatchFunction,

        //This boolean value is to determine whether or not the feed being rendered on the home page or community page 
        //Does the app can decide whether or not the join button should rendered. 
        isCommunity,
    } = props; 



    //This part needs to change based on the user's voting history on the current thread
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNum, setUpvoteNum] = useState(0);
    const [downvoteNum, setDownvoteNum] = useState(0)

    //Array of all votes owned by the thread 
    //This is used to update the 'votes' array in firestore
    const [voteArray, setVoteArray] = useState([])

    const context = {
        upvoted,
        downvoted,
        upvoteNum,
        downvoteNum,
        voteArray,
        setVoteArray,
        changeUpvoted: num => {
            setUpvoted(num)
        },
        changeDownvoted: num => {
            setDownvoted(num)
        },
        changeUpvoteNum: num => {
            setUpvoteNum(num)
        },
        changeDownvoteNum: num => {
            setDownvoteNum(num)
        },
        ID: threadID, 
        isVertical: true, 
        FirestoreCollectionType: "Threads", 

        //Data for updated the sorted array of threads 
        index: threadIndex, 
        sortedArray,
        dispatchFunction, 
        shouldUpdateSortedArray: true, 
    }

    //function for processing voting data retrieved from Firebase
    const extractVoteData = () => {
        var upvotes = 0;
        var downvotes = 0;
        votes.forEach(vote => {
            if (vote.upvote) {
                upvotes++;
                //if the current vote is owned by the currently logged in user
                
                if (currentUserData !== null && currentUserData !== undefined && vote.userID == currentUserData.userID)
                { setUpvoted(true) }
            }
            if (vote.downvote) {
                downvotes++;
                //if the current vote is owned by the currently logged in user
                if (currentUserData !== null && currentUserData !== undefined && vote.userID == currentUserData.userID)
                { setDownvoted(true) }
            }

        })
        //store the votes array into the voteArray useState object
        setVoteArray(votes)
        setUpvoteNum(upvotes);
        setDownvoteNum(downvotes);
    }

    useEffect(() => {
        if (votes !== null && votes !== undefined) {
            extractVoteData();
        }
    }, [votes])

    const [communityData, setCommunityData] = useState(SampleCommunity.find(val => val.communityID === communityID))


    const RenderBodyText = useCallback(() => {
        return (
            <BodyText
                BackgroundStatus={JSON.parse(textBody).length < 50}
                onClick={ToThread}
            ><Serialize data={JSON.parse(textBody)} />
            </BodyText>
        )
    }, []);

    const navigate = useNavigate(); 
    const ToCommunity = useCallback(() => navigate('./community', {
        state: {
            communityID: communityID,
        }}), [navigate])

    const ToThread = useCallback(() => navigate('../thread', {
        state: {
            threadID: threadID, 
            threadIndex: threadIndex, 
        }
    }), [navigate])

    var MainContainerID = `MainContainer-${threadID}`

    const [isMember, setIsMember] = useState(currentUserData !== null && currentUserData !== undefined ? currentUserData.communityMembership.some(val => val === communityID) : null) 

    useEffect(() => {
        if (currentUserData!== null && currentUserData !== undefined) {
            setIsMember(currentUserData.communityMembership.some(val => val === communityID))
        }
    }, [currentUserData])

    return (
        <CardContext.Provider value={context}>
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                <MainContainer id={MainContainerID}>
                    <VotingColumn>
                        <RenderVerticalVoting
                            contextType={CardContext}
                        />
                    </VotingColumn>
                    <MainColumn>
                        <CommunityTitleWrapper className= "Card_CommunityTitleWrappe">
                            <ComunityTitleSecondaryWrapper onClick={ToThread} className="Card_CommunityTitleSecondaryWrapper">
                                    <RenderRIcon image={communityData ? communityData.communityImage : null} />
                                    <CommunityTitle className="Card_CommunityTitle">r/{community} </CommunityTitle>
                                    <span> &#x2022;</span>
                                    <Author className="Card_Author">Posted by u/{authorName} </Author>
                                    <TimePosted className="Card_TimePosted">{RenderTimePosted(timePosted)}</TimePosted>
                             </ComunityTitleSecondaryWrapper>
                            {!isCommunity && !isMember && (currentUserData === null || currentUserData === undefined) &&
                                <Button
                                onClick={()=>JoinCommunity(
                                    currentUserData.userID,
                                    communityID, 
                                    setIsMember,
                                    addMembership
                                )}
                                >Join</Button>}
                        </CommunityTitleWrapper>
                        <ThreadTitle onClick={ToThread} >{title}</ThreadTitle>
                        <RenderBodyText />
                        <RenderPostFooter commentNumber={commentNumber} navigateFunction={ToThread} />
                    </MainColumn>
                </MainContainer>
            </ThemeProvider>
        </CardContext.Provider> 
        ) 
}

export default RenderCardItem; 
