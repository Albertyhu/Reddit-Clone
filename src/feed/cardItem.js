import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext, CardContext  } from '../components/contextItem.js'; 
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import RenderPostFooter from '../thread/postFooter.js'; 
import { Divider } from '../global/styledComponents.js'; 
import RenderRIcon from '../asset/icons/r_icon.js'; 
import { SampleCommunity } from '../helperTools/dummyData.js';
import { RenderTimePosted } from '../components/renderTimePosted.js'; 
import { useNavigate } from "react-router-dom";

const RenderCardItem = props => {
    const { normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext);

    const {
        community, 
        communityID, 
        threadID,
        title,
        flair, 
        authorName, 
        authorID, 
        textBody, 
        awards, 
        timePosted, 
        votes, 
        commentNumber, 
    } = props; 


    //This part needs to change based on the user's voting history on the current thread
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNum, setUpvoteNum] = useState(0);
    const [downvoteNum, setDownvoteNum] = useState(0)

    const context = {
        upvoted,
        downvoted,
        upvoteNum,
        downvoteNum,
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
    }

    //needs to be updated when the voting gets 
    useEffect(() => {
        if (votes !== null) {
            setUpvoteNum(votes.upvote)
            setDownvoteNum(votes.downvote)
        }
    }, [votes])

    const [communityData, setCommunityData] = useState(SampleCommunity.find(val => val.communitID === communityID))

    const RenderBodyText = useCallback(() => {
        return (
            <BodyText onClick={ToThread}><p>{textBody}</p></BodyText>
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
        }
    }), [navigate])

    return (
        <CardContext.Provider value={context}>
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                <MainContainer>
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
                            <Button>Join</Button>
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
`

const CommunityTitleWrapper = styled.div`
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
    color: ${props => props.theme.TextColor || "#000000"};
`

const BodyText = styled.div`
    position: relative; 
    max-height: 350px; 
    overflow-y: hidden;
       &:after{
              z-index: 0;
              position: absolute;
              bottom: 0;  
              height: 100%;
              width: 100%;
              content: "";
              background: ${props => props.theme.CardTextLinearGradColor};
    }
`