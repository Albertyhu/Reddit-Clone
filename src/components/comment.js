import React, { useState, useEffect, useRef, useContext } from 'react'; 
import styled from 'styled-components'; 
import { CgArrowsExpandLeft } from 'react-icons/cg';
import CrossedArms from '../asset/images/crossed-arms.jpg'; 
import {
    downArrow,
    upArrow,
    upvote,
    downvote,
    UpArrowDarkMode,
    DownArrowDarkMode
} from '../asset/icons'; 
import { FaRegCommentAlt } from 'react-icons/fa';
import { CommentContext, AppContext } from './contextItem.js';
import RenderReplyTextArea from './richTextEditor.js'; 
import uuid from 'react-uuid'; 
import { RenderAllCommentsContext } from './contextItem.js'; 
import RenderAllComments from '../thread/renderAllComments';
import { RenderTimePosted } from './renderTimePosted.js'; 
import { IoEllipsisHorizontal } from "react-icons/io5";

//Serialize is responsible for converting the comments retrived from Firestore from JSON to HTML 
import { Serialize } from './slateJSComponents/serializer.js'; 

import { RenderVerticalVoting } from './votingComponent.js'; 

const Comment = props => {
    //isLastDescendant determinse if the comment is the last reply in the chain. 
    //...It's important for the rendering of threadlines 
    const { authorName,
        commentID,
        bodyText,
        textBody, 
        children, 
        timePosted,
        votes,
        replies,
        isLastDescendant = true,
        count = 0,
        parentComment,
        ancestors,

        //CommentIndex is the index of the current comment in the sorted array in renderAllComments.js
        CommentIndex,  
    } = props; 

    const {
        sortedComments,
        getSortedComments, 
        setSortedCom,
    } = useContext(RenderAllCommentsContext); 

    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
        currentUserData,
        desktopView, 
    } = useContext(AppContext);

    //Edit option is displayed if the current comment belongs to the current user
    const [displayEdit, setDisplayEdit] = useState(false); 
    const [divWidth, setDivWidth] = useState(740)
    const DIVWIDTH = 740; 


    const createThreadLineSpace = () => {
        var format = "auto"
        if (ancestors === undefined || ancestors === null || ancestors.length === 0)
            return format
        format = 'max-content;'
        var threadSpace = ''; 
        for (var i = 0; i < ancestors.length; i++) {
            threadSpace += '20px '; 
        }

        format = threadSpace + format; 
        return format; 

    }

    const [columnFormat, setColumnFormat] = useState(createThreadLineSpace())
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false); 
    const [upvoteNum, setUpvoteNum] = useState(votes.upvote);
    const [downvoteNum, setDownvoteNum] = useState(votes.downvote)
    const [displayReplyInput, setDisplayReplyInput] = useState(false)
    const [containerElem, setContainerElem] = useState(null); 
    const ExpandIconID= `expandIconID-${commentID}`


    //Array of all votes owned by the thread 
    //This is used to update the 'votes' array in firestore
    const [voteArray, setVoteArray] = useState([])

    //function for processing voting data retrieved from Firebase
    const extractVoteData = () => {
        var upvotes = 0;
        var downvotes = 0;
        votes.forEach(vote => {
            if (vote.upvote) {
                upvotes++;
                //if the current vote is owned by the currently logged in user
                if (currentUserData !== null && currentUserData !== undefined && vote.userID == currentUserData.userID) { setUpvoted(true) }
            }
            if (vote.downvote) {
                downvotes++;
                //if the current vote is owned by the currently logged in user
                if (currentUserData !== null && currentUserData !== undefined && vote.userID == currentUserData.userID) { setDownvoted(true) }
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
            // setUpvoteNum(votes.upvote)
            // setDownvoteNum(votes.downvote)
        }
    }, [votes])

    //Maintains the width of the reply text area accordingly to the width
    //...of the main comment container. The more threadlines the comment
    //...has, the smaller the width is. 
    const measureReplyWidth = () => {
        if (ancestors === undefined ||
            ancestors === null ||
            ancestors.length === 0)
            return 700
        var threadCount = 20;
        for (var i = 0; i < ancestors.length; i++) {
            threadCount += 20;
        }
        return DIVWIDTH - threadCount
    }
    const [replyContWidth, setReplyContWidth] = useState(measureReplyWidth())

    const toggleDisplayReply = () => {
        setDisplayReplyInput(prev => !prev)
    }

    const context = {
        isLastDescendant, 
        upvoted,
        downvoted,
        upvoteNum,
        downvoteNum, 
        voteArray,
        replyContWidth, 
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
        ID: commentID, 
        isVertical: false, 
        FirestoreCollectionType: "Comments", 

        //data for updating sorted array of comments 
        index: CommentIndex, 
        sortedArray: sortedComments,
        dispatchFunction: setSortedCom,
        shouldUpdateSortedArray: false,
        commentID,
    }

    //The following code is give the user the ability to hide a parent comment
    //... and its child 
    const mainRef = useRef(); 

    useEffect(() => {
        if (mainRef !== null) {
            setContainerElem(document.getElementById(`CommentContainer-${commentID}`)); 
        }
    }, [mainRef.current])

    useEffect(() => {
        if (containerElem !== null && ancestors !== undefined && ancestors !== null && ancestors.length !== 0) {
            ancestors.forEach(item => {
                containerElem.classList.add(`childOf_${item}`)
            })
        }
    }, [containerElem])

    //code for hidden mobile panel that contains the buttons to the left of the Reply button
    const [displayHiddenPanel, setDisplay] = useState(false)
    const toggleDisplay = () => {
        setDisplay(prev => !prev);
    }
    const closeDisplay = () => {
        setDisplay(false)
    } 

    const CommentMobilePanelRef = useRef(); 
    var CommentMobilePanelElem = document.getElementById('CommentMobilePanelCont'); 

    useEffect(() => {
        if (CommentMobilePanelRef.current) {
            CommentMobilePanelElem = document.getElementById('CommentMobilePanelCont'); 
        }
    }, [CommentMobilePanelRef.current])

    const checkIfClickedOuside = event => {
        CommentMobilePanelElem = document.getElementById('CommentMobilePanelCont'); 
        if (CommentMobilePanelRef.current && displayHiddenPanel && !CommentMobilePanelRef.current.contains(event.target)) {
            setDisplay(false)
        }
    }
    const closePanel = () => {
        setDisplay(false)
    }

    document.addEventListener('mousedown', checkIfClickedOuside);
    useEffect(() => {
        return () => { document.removeEventListener('mousedown', checkIfClickedOuside); }
    }, [])

    return (
        <CommentContext.Provider value={context}  >
            <CommentContainer columnFormat={columnFormat} id={`CommentContainer-${commentID}`} ref={mainRef}>
                <RenderThreadLines ancestors={ancestors} children={children} />
                <AuthorContainer id = "CommentAuthorContainer">
                    <CommentHeader id = "CommentHeader" >
                            <CgArrowsExpandLeft
                                style={ExpandIconStyle}
                                onClick={() => {
                                    unhideTree(commentID, children)
                                    }}
                                id={ExpandIconID}
                           />
                        <Avatar src={CrossedArms} />
                        <CommentHeaderShell>
                             <UserName>Posted by {authorName}</UserName>
                            <TimePosted> &#x2022; {RenderTimePosted(timePosted)}</TimePosted>
                        </CommentHeaderShell>
                    </CommentHeader>
                    <InnerContainer
                        id={`CommentInnerContainer-${commentID}`}
                    >
                        <Thread
                            dispatchFunc={() => {
                                console.log(`Thread-${commentID} line`)
                                console.log("children: ")
                                console.log(children)
                                hideTree(commentID, children)
                            }}
                            commentID={commentID}
                            isAncestor={false}
                            children={children}
                            id={`Thread-${commentID}`}
                        /> 
                        <SecondInnerCont
                            id="CommentSecondInnerCont"
                           // widthVal={`${replyContWidth}px`}
                            widthVal = 'auto'
                            >
                            <TextArea><Serialize data={JSON.parse(textBody)} /></TextArea>
                            <CommentFooter>
                                <RenderVerticalVoting contextType={CommentContext} />
                                <ReplyDiv onClick={toggleDisplayReply}><FaRegCommentAlt id="CommentIcon" style={commentIconStyle} /> <FooterText>Reply</FooterText></ReplyDiv>
                                {desktopView ? 
                                    <>
                                        <Wrapper>Share</Wrapper>
                                        <Wrapper>Report</Wrapper>
                                        <Wrapper>Save</Wrapper>
                                        <Wrapper>Follow</Wrapper>
                                    </>
                                    :
                                    <MobilePanelWrapper>
                                        {displayHiddenPanel && 
                                            <MobilePanelCont id="CommentMobilePanelCont" ref={CommentMobilePanelRef}>
                                            <Wrapper onClick={closePanel}>Share</Wrapper>
                                            <Wrapper onClick={closePanel}>Report</Wrapper>
                                            <Wrapper onClick={closePanel}>Save</Wrapper>
                                            <Wrapper onClick={closePanel}>Follow</Wrapper>
                                            <Wrapper onClick={closePanel}>Close Menu</Wrapper>
                                            </MobilePanelCont>
                                        }
                                        <Dots dispatch={toggleDisplay}></Dots>
                                    </MobilePanelWrapper>
                                    }

                            </CommentFooter>
                            {displayReplyInput && <ReplyInput replyContWidth={replyContWidth} />}
                        </SecondInnerCont>
                        </InnerContainer>
                </AuthorContainer>
            </CommentContainer>
         </CommentContext.Provider>
        ) 
}

//function for calculating columnFormat value and adding threadlines to the left side of comment
//It returns an array so that the map method can be used on it to render the threadlines. 
const RenderThreadLines = props => {
    const { ancestors } = props; 
    const { getSortedComments } = useContext(RenderAllCommentsContext)
    const [sortedComments, setSortedComments] = useState(getSortedComments())
    var arr = []; 
    if (ancestors !== undefined && ancestors !== null && ancestors.length !== 0) {
        for (var i = 0; i < ancestors.length; i++) {
            arr.unshift(ancestors[i])
        }
    }

    return arr.map((item, ind) => {
    //    var index = ComArr.indexOf(val => val.commentID === item)
     //   console.log(ComArr)
        var targetComment = null; 
        const MyPromise = new Promise((resolve, reject) => {
            if (sortedComments) {
                resolve(sortedComments)
            }
            else {
                reject(null)
            }
        })

        MyPromise.then(
            function (success) {
                targetComment = sortedComments.find(val => val.commentID == item);
                },
            function(error){
                setSortedComments(getSortedComments())
            }
        )
        function Collapse() {
            console.log("ancestor line")
            hideTree(item, targetComment.children)
        }

        return <Thread
            key={uuid()}
            dispatchFunc={Collapse}
            commentID={item}
            isAncestor={true}
            children={targetComment !== null ? targetComment.children : null}
        /> 
    }); 
}

const Thread = props => {
    const {
        dispatchFunc,
        threadlineID,
        commentID,
        isAncestor,
    } = props;
    //The following block of code is responsive for highlight event once the mouse hovers over the thread line
    //Once a threadline is highlighted, it becomes bolder and its color turns blue. 
    //The thread line is given a unique id name 
    //Thus, once the line is highlighted, all the other lines that are vertically aligned with it will be highlighted too
    //threadRef will point to <ThreadCont> to keep track of when it is mounted. 
    const threadRef = useRef();
    
    //The following useState object points to the <ThreadCont> component 
    const [threadElem, setThreadElem] = useState(null)

    const makeHighlighted = () => {
        for (var i = 0; i < threadElem.length; i++) {
            threadElem.item(i).style.borderRight = "2px solid #3033ff";
        }
    }
    const removeHighlight = () => {
        for (var i = 0; i < threadElem.length; i++) {
            threadElem.item(i).style.borderRight = "1px solid #9d9d9d";
        }
    }

    useEffect(() => {
        return () => {
            if (threadElem !== null) {
                 for (var i = 0; i < threadElem.length; i++) {
                    threadElem.item(i).removeEventListener("mouseover", () => { makeHighlighted() });
                    threadElem.item(i).removeEventListener("mouseout", () => { removeHighlight() })
                }
            }
        }
    }, [])
    
    //Once the <ThreadCont> component is mounted, set ThreadElem to point to it 
    useEffect(() => {
        setThreadElem(document.getElementsByClassName(`threadlineID-${commentID}`))
    }, [threadRef.current])

    //Add the event listener 
    useEffect(() => {
        if (threadElem !== null) {
            for (var i = 0; i < threadElem.length; i++){
                threadElem.item(i).addEventListener("mouseover", () => { makeHighlighted() });
                threadElem.item(i).addEventListener("mouseout", () => { removeHighlight() })
            }
                }
    }, [threadElem])

    const handleClickEvent = () => {
         dispatchFunc();
    }

    //If the threadline is owned by an ancestor of the comment, make 
    //...the ancestor's name as part of its className.
    //Otherwise, make the current comment's name as part of its className
    var commentClassName = isAncestor ? `threadlineID-${commentID}` : `${threadlineID}`

    return (
        <ThreadCont className="ThreadCont" onClick={handleClickEvent}  >
            <ThreadLine
                className={`threadlineID-${commentID}`}
                borderHover={"1px solid #9d9d9d"}
                ref={threadRef} />
        </ThreadCont>
        )
}


const hideTree = (name, childrenArr) => {
    const threadlines = document.getElementsByClassName(`threadlineID-${name}`);
    const ExpandIcon = document.getElementById(`expandIconID-${name}`);
    const CurrentComment = document.getElementById(`CommentInnerContainer-${name}`);
    for (var i = 0; i < threadlines.length; i++) {
        threadlines.item(i).style.display = "none"; 
    }

    ExpandIcon.style.display = 'block';
    CurrentComment.style.display = 'none';
    hideChildren(childrenArr)
}

const hideChildren = (childrenArr) => {
    if (childrenArr !== undefined && childrenArr !== null && childrenArr.length !== 0) {
        childrenArr.forEach(child => {
            var element = document.getElementById(`CommentContainer-${child}`)
                element.style.display = "none"
        })
    }
}

const unhideTree = (name, childrenArr) => {
    const threadlines = document.getElementsByClassName(`threadlineID-${name}`)
    const ExpandIcon = document.getElementById(`expandIconID-${name}`)
    const CurrentComment = document.getElementById(`CommentInnerContainer-${name}`);

    for (var i = 0; i < threadlines.length; i++) {
        threadlines.item(i).style.display = "block"
    }
    ExpandIcon.style.display = 'none';
    CurrentComment.style.display = "grid"
    unhideChildren(childrenArr)
}

const unhideChildren = (childrenArr) => {
    if (childrenArr !== undefined && childrenArr !== null && childrenArr.length !== 0) {
        childrenArr.forEach(child => {
            var element = document.getElementById(`CommentContainer-${child}`)
            element.style.display = "grid"
        })
    }
}


const ReplyInput = props => {
    const { commentID, replyContWidth } = useContext(CommentContext)
//    const [borderStyle, setBorder, replyContWidth] = useState("2px solid #d6d6d6")
    const [borderStyle, setBorder] = useState("2px solid #d6d6d6")

    const replyRef = useRef(); 
    const clickEvent = e => {
        if (replyRef.current && replyRef.current.contains(e.target)) {
            setBorder("2px solid #474747")
        }
        else {
            setBorder("2px solid #d6d6d6")
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickEvent)
        return () => { document.removeEventListener("mousedown", clickEvent)}
    }, [])

    return (
        <ReplyInnerContainer widthVal={replyContWidth} id ="ReplyInnerContainer">
            <Thread dispatchFunc={null} />
            <RenderReplyTextArea parentID={commentID}/>
        </ReplyInnerContainer>
        )
} 

const Dots = props => <Wrapper id="dots" onClick={props.dispatch}><IoEllipsisHorizontal /></Wrapper>

export default Comment; 

const Button = styled.div`
    display:flex; 
    whitespace: nowrap; 
    cursor: pointer;
    & > p {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 5px;
}
    &:hover{
     background-color: #cdcdcd; 
    }
    &#dots{
        font-size: 30px;
        z-index: 10;
        width: fit-content;
    }
`

const CommentContainer = styled.div`
    display: ${props => props.displayVal || "grid"}; 
    grid-template-columns: ${props => props.columnFormat};
    font-family: 'Verdana'; 
    margin-left: 10px;
    margin-right: 10px;
`

//Need to set the last item of grid-template-columns to max-content in the
//...InnerContainer component, and set max-width to 720px in the 
//...SecondInnerCont component. Otherwise, the comments will have a very
//... small width
const InnerContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 20px max-content; 
    font-family: 'Verdana'; 
`
const ReplyInnerContainer = styled.div`
    //max-width: ${props => props.widthVal}px;
    width: 100%;
    display: grid;
    grid-template-columns: 20px 95%; 
    font-family: 'Verdana'; 
`

const SecondInnerCont = styled.div`
max-width: 720px;
width: ${props => props.widthVal};
@media screen and (max-width: 540px){
    max-width: 224px;
}
`

const CommentHeader = styled.div`
display: flex; 
`

const CommentHeaderShell = styled.div`
@media screen and (max-width: 540px){
    display: grid;
}
`

const Avatar = styled.img`
    width: 28px;
    height: 28px; 
    resize: none; 
    border-radius: 28px; 
    magin: auto; 
    background-color: "cdcdcd";
//    display: inline-block; 
`
const UserName = styled.div`
    font-size: 12px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    margin-right: 10px;
`

const TimePosted = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    color: #adadad; 
    font-size: 12px;
    white-space:nowrap;
`
const TextArea = styled.div`
font-family: inherit; 
margin-top: 10px;
margin-bottom: 10px;
`

const CommentFooter = styled.div`
    height: 40px; 
    width: 100px; 
    display: flex;
`

const ExpandIconStyle = {
    width: "15px",
    height: "15px",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "10px",
    cursor: "pointer", 
    display: "none", 
}

const ThreadCont = styled.div`
    height: 100%; 
    width: 100%; 
`
const ThreadLine = styled.div`
    width: 50%; 
    height: 100%;
    border-right: ${props => props.borderHover || "1px solid #9d9d9d"}; 
    cursor: pointer; 

`
const VoteIcon = styled.img`
    width: 24px; 
    height: 24px; 
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;
`

const VoteNumber = styled.div`
    display: inline-block; 
    margin-left: 10px;
    margin-right: 10px;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: bold;
    font-size: 12px;
`

const FooterText = styled.div`
    display: inline-block; 
    margin-left: 5px;
    margin-right: 5px;
    margin-top: auto;
    margin-bottom: auto;
`

const Wrapper = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    color: #6d6d6d;
    font-size: 12px; 
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer; 
    padding: 6px 4px;
    font-weight: bold;
    &:hover{
       background-color: ${props => props.theme.HoverColor || "#cdcdcd"}; 
    }
    &#dots{
        font-size: 30px;
        z-index: 10;
        width: fit-content;
    }
`

const ReplyDiv = styled.div`
    color: #6d6d6d;
    font-size: 12px; 
    display: flex;
    whitespace: nowrap; 
    justify-content: space-between; 
    font-weight: bold;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    margin-right: 5px;
    cursor: pointer; 
    padding: 6px 4px;
    &:hover{
     background-color: ${props => props.theme.HoverColor || "#cdcdcd"}; 
    }

`

const commentIconStyle = {
    width: "24px",
    height: "24px",
    color: "#adadad",

}

const SideThreadCont = styled.div`


`

const AuthorContainer = styled.div``


const MobilePanelWrapper = styled.div`
    position: relative; 
`
const MobilePanelCont = styled.div`
    display: grid; 
    position: absolute; 
    background-color: #ffffff; 
    border: 1px solid #000000;
    z-index:99;
`