import React, { useState, useEffect } from 'react'; 
import Comment from '../components/comment.js';  
import {
    MainContainer,
    PanelContainer,
    SideBar,
    Title, 
} from '../global/styledComponents.js'; 
import { threads, comments } from '../helperTools/dummyData.js'; 
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import { ThreadContext } from '../components/contextItem.js'; 
import RenderMainPost from './renderMainPost.js'; 
import RenderReplyTextArea from '../components/replyTextArea.js'; 
import styled from 'styled-components'; 
import { RenderCommentSort } from '../sort/sortComponent.js'; 
import RenderAllComments from './renderAllComments.js'; 

const RenderThread = props => {
    const { threadID } = props 

    //threadData stores the information about the individual thread
    //...such as the body of the text, the author's name, etc. 
    const [threadData, setThreadData] = useState(null)

    //commentArr stores all the comments that have the threadID
    const [commentArr, setCommentArr] = useState(comments.filter(elem => elem.threadID === threadID))

    //filterOption is the current setting for how the comments should be sorted 
    const [filterOption, setFilter] = useState("Top")

    //sortOptions is the available options for methods for sorting
    //const sortOptions = ["Hot", "Top", "New", "Oldest"]
    const sortOptions = ["Top", "Controversial"]

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
        }
    }, [threadData])

    return (
        <ThreadContext.Provider value = {context}>
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
                <SideBar id = "ThreadSideBar"></SideBar>
            </MainContainer> 
        </ThreadContext.Provider>
        )
}

export default RenderThread; 

const CommentWrapper = styled.div`
    display: grid; 
    font-family: "Verdana"; 
    background-color: #ffffff;
`

const UserName = styled.div`
    color: #b5b5b5; 
`

