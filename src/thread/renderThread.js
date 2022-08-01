import React, { useState, useEffect, useContext } from 'react'; 
import Comment from '../components/comment.js';  
import {
    MainContainer,
    PanelContainer,
    SideBar,
    Title, 
} from '../global/styledComponents.js'; 
import { threads, comments, SampleCommunity } from '../helperTools/dummyData.js'; 
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import { ThreadContext, AppContext } from '../components/contextItem.js'; 
import RenderMainPost from './renderMainPost.js'; 
import RenderReplyTextArea from '../components/richTextEditor.js'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { RenderCommentSort } from '../sort/sortComponent.js'; 
import RenderAllComments from './renderAllComments.js'; 
import RenderSideBar from './sidebar.js'; 

const RenderThread = props => {
    const { threadID } = props 

    //threadData stores the information about the individual thread
    //...such as the body of the text, the author's name, etc. 
    const [threadData, setThreadData] = useState(null)

    //communityData stores information of the community that the thread belongs to
    const [communityData, setCommunityData] = useState(null)

    //commentArr stores all the comments that have the threadID
    const [commentArr, setCommentArr] = useState(comments.filter(elem => elem.threadID === threadID))

    //filterOption is the current setting for how the comments should be sorted 
    const [filterOption, setFilter] = useState("Top")

    //sortOptions is the available options for methods for sorting
    //const sortOptions = ["Hot", "Top", "New", "Oldest"]
    const sortOptions = ["Top", "Controversial", "Newest", "Oldest"]

    //This part needs to change based on the user's voting history on the current thread
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNum, setUpvoteNum] = useState(0);
    const [downvoteNum, setDownvoteNum] = useState(0)

    const context = {
        ...threadData, 
        filterOption,
        commentArr,
        setCommentArr,
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

    useEffect(() => {
        if (threadID !== null || threadID !== undefined || threadID !== '') {
            setThreadData(threads.find(elem => elem.threadID === threadID))
        }
    }, [threadID])

    //needs to be updated when the voting gets 
    useEffect(() => {
        if (threadData !== null) {
            setUpvoteNum(threadData.votes.upvote)
            setDownvoteNum(threadData.votes.downvote)
            setCommunityData(SampleCommunity.find(elem => elem.communityID === threadData.communityID))
        }
    }, [threadData])

    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext);

    return (
        <ThreadContext.Provider value={context}>
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                <MainContainer id = "ThreadMainContainer">
                    <PanelContainer id="ThreadPanelContainer">
                        <RenderMainPost /> 
                        <CommentWrapper> 
                            <RenderReplyTextArea
                                marginLeft="auto"
                                marginRight="auto"
                                ReplyWidth="90%"
                                marginTop="20px"
                                author="author"
                            /> 
                        </CommentWrapper>
                        <RenderCommentSort
                            selected={filterOption}
                            optionsArr={sortOptions}
                            dispatchFunc={setFilter}
                        />
                        {commentArr !== null && commentArr.length !== 0 ?
                            <RenderAllComments
                                filterOption={filterOption}
                                commentArr={commentArr}
                            />
                            : 
                            null
                            }
                    </PanelContainer>
                    <SideBar id="ThreadSideBar">
                        {communityData !== undefined && communityData !== null ?

                            <RenderSideBar
                                members={communityData.members}
                                customNamedMembers={communityData.customNamedMembers}
                                onlineMembers={communityData.onlineMembers}
                                dateCreated={communityData.dateCreated}
                                description={communityData.description}
                                communityTitle={communityData.communityTitle}
                                CommunityTheme={communityData.CommunityTheme}
                                rules={communityData.rules}
                                moderators={communityData.moderators}
                                onThread={true}
                                communityImage={communityData.communityImage}
                            />
                            : 
                            null
                            }
                    </SideBar>
                    </MainContainer> 
                </ThemeProvider>
        </ThreadContext.Provider>
        )
}

export default RenderThread; 

const CommentWrapper = styled.div`
    display: grid; 
    font-family: "Verdana"; 
    background-color: ${props => props.theme.ContentBodyBackgroundColor}; 
    color: ${props => props.theme.TextColor}; 
`

const UserName = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`

