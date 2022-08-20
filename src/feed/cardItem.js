import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext, CardContext  } from '../components/contextItem.js'; 
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import RenderPostFooter from '../thread/postFooter.js'; 
import { Divider } from '../global/styledComponents.js'; 
import RenderRIcon from '../asset/icons/r_icon.js'; 
import { SampleCommunity } from '../helperTools/dummyData.js';
import { RenderTimePosted } from '../components/renderTimePosted.js'; 
import { useNavigate } from "react-router-dom";
import { Serialize } from '../components/slateJSComponents/serializer.js'; 
import { JoinCommunity } from '../components/membershipButton.js'; 

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
                        <CommunityTitleWrapper>
                            <ComunityTitleSecondaryWrapper onClick={ToThread}>
                                    <RenderRIcon image={communityData ? communityData.communityImage : null} />
                                    <CommunityTitle>r/{community} </CommunityTitle>
                                    <span> &#x2022;</span>
                                    <Author>Posted by u/{authorName} </Author>
                                    <TimePosted> {RenderTimePosted(timePosted)}</TimePosted>
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

const MainContainer = styled.div`
    display: grid; 
    grid-template-columns: 8% 92%; 
    background-color: ${props => props.theme.PanelBackgroundColor}; 
    color: ${props => props.theme.TextColor}; 
    margin: 10px auto;
    font-family: "Verdana";
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.0); 
    overflow-y: hidden;
    &:hover{
        border: ${props => props.theme.CardBorderHover};
}
` 

const VotingColumn = styled.div`
    background-color: ${props => props.theme.SearchBarBackgroundColor};
    padding: 10px 0px;
`

const MainColumn = styled.div`
    margin: 0 20px;
    cursor: pointer;
`

const Button = styled.div`
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 5px 6px;
    min-width: 10px;
    witdh: fit-content;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    margin-right: 5px;
    background-color: ${props => props.theme.ButtonBackgroundC}; 
    color: ${props => props.theme.ButtonTextC}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover}; 
    }
    @media screen and (max-width: 540px){
        min-width: 40px;
    }
`

const CommunityTitleWrapper = styled.div`
margin-top: 10px; 
display: grid;
grid-template-columns: 90% 10%; 
`
const ComunityTitleSecondaryWrapper = styled.div`
        display: flex;
    & > * {
        font-size: 12px;
        margin: auto 5px; 
    }
`

const CommunityTitle = styled.div`
    font-size: 12px;
    font-weight: bold; 
    color: ${props => props.theme.TextColor || "#000000"}; 
`

const Author = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`

const TimePosted = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`

const ThreadTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin: 10px 0px;
    color: ${props => props.theme.TextColor || "#000000"};
`


//This is responsible for creating the fading effect seen on each card 
const BodyText = styled.div`
    position: relative; 
    max-height: 350px; 
    overflow-y: hidden;
    min-height: 200px;
    &:after{
              z-index: 0;
              position: absolute;
              bottom: 0;  
              height: 100%;
              width: 100%;
              content: "";
              background: ${props => props.theme.CardTextLinearGradColor }; 
    }
`