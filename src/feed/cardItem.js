import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext, CardContext  } from '../components/contextItem.js'; 
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import RenderPostFooter from '../thread/postFooter.js'; 
import { Divider } from '../global/styledComponents.js'; 
import RenderRIcon from '../asset/icons/r_icon.js'; 
import { SampleCommunity } from '../helperTools/dummyData.js';
import { RenderTimePosted } from '../components/renderTimePosted.js'; 

const RenderCardItem = props => {
    const { normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext);

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
        changeUpvoted,
        changeDownvoted,
        changeUpvoteNum,
        changeDownvoteNum,
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

    const {
        community, 
        communityID, 
        flair, 
        authorName, 
        authorID, 
        textBody, 
        awards, 
        timePosted, 
        votes, 
    } = props; 

    const [communityData, setCommunityData] = useState(setCommunityData(SampleCommunity.find(val => val.communitID === communityID)))


    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <CardContext.Provider value={context}>
                <VotingColumn>
                    <RenderVerticalVoting
                            contextType={CardContext}
                    />
                </VotingColumn>
                <MainContainer>
                    <CommunityTitleWrapper>
                        <RenderRIcon image={communityData ? communityData.communitImage : null} />
                        <CommunityTitle>r/{CommunityTitle} &#x2022; </CommunityTitle>
                        <Author>Posted by u/{authorName} </Author>
                        <TimePosted> {RenderTimePosted(timePosted)}</TimePosted>
                        <Button>Join</Button>
                    </CommunityTitleWrapper>
                    <ThreadTitle>{title}</ThreadTitle>
                    <RenderPostFooter />
                </MainContainer>
            </CardContext.Provider> 
        </ThemeProvider>
        ) 
}

export default RenderCardItem; 

const MainContainer = styled.div`
    display: grid; 
    grid-template-columns: 20% 80%; 
    background-color: ${props => props.theme.SearchBarBackgroundColor}
` 

const VotingColumn = styled.div`
    background-color: ${props => props.theme.PanelBackgroundColor}
`

const Button = styled.div`
    width: 100%; 
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding-top: 10px;
    padding-bottom: 10px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    background-color: ${props => props.theme.ButtonBackgroundColor || "#ffffff"}; 
    color: ${props => props.theme.ButtonTextColor || "#000000"}; 
    &:hover{
    background-color: ${props => props.theme.ButtonBackgroundCHover}; 
}
`

const CommunityTitleWrapper = styled.div`
    display: flex; 
`
const CommunityTitle = styled.div`
    font-size: 10px;
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
    font-size: 25px; 
    color: ${props => props.theme.TextColor || "#000000"};
`

const BodyText = styled.div`
    color: ${props => props.theme.TextColor || "#000000"}; 

`