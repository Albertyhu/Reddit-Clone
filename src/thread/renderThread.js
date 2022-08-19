import React, { useState, useEffect, useContext } from 'react'; 
import Comment from '../components/comment.js';  
import {
    MainContainer,
    PanelContainer,
    SideBar,
    Title, 
} from '../global/styledComponents.js'; 
import { threads, comments, SampleCommunity } from '../helperTools/dummyData.js'; 
import { ThreadContext, AppContext } from '../components/contextItem.js'; 
import RenderMainPost from './renderMainPost.js'; 
import RenderReplyTextArea from '../components/richTextEditor.js'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { RenderCommentSort } from '../sort/sortComponent.js'; 
import RenderAllComments from './renderAllComments.js'; 
import RenderSideBar from './sidebar.js'; 
import { useLocation } from 'react-router-dom'; 
import { doc, setDoc, collection, query, where, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { db } from '../firebaseComponent.js';

const auth = getAuth(); 

const RenderThread = props => {
    const location = useLocation();
    const {
        threadID,

        //threadIndex is the index of the current thread in the sorted array in renderAllComments.js 
        threadIndex, 
    } = location.state; 

    //threadData stores the information about the individual thread
    //...such as the body of the text, the author's name, etc. 
    const [threadData, setThreadData] = useState(null)

    //community stores information of the community that the thread belongs to
    const [community, setCommunityData] = useState(null)

    //commentArr stores all the comments that have the threadID
    const [commentArr, setCommentArr] = useState(comments.filter(elem => elem.threadID === threadID))



    //filterOption is the current setting for how the comments should be sorted 
    const [filterOption, setFilter] = useState("Top")

    //sortOptions is the available options for methods for sorting
    const sortOptions = ["Top", "Controversial", "New", "Old"]

    //This part needs to change based on the user's voting history on the current thread
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNum, setUpvoteNum] = useState(0);
    const [downvoteNum, setDownvoteNum] = useState(0)

    //Array of all votes owned by the thread 
    //This is used to update the 'votes' array in firestore
    const [voteArray, setVoteArray] = useState([])

    const [useCommunityTheme, setCommunityTheme] = useState(false);

    const context = {
        ...threadData,
        threadID, 
        filterOption,
        commentArr,
        setCommentArr,
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
        //passes all data of desired community 
        ...community,

        //threadIndex is the index of the current thread in the sorted array in renderAllComments.js
        index: threadIndex, 
        shouldUpdateSortedArray: false, 
       
    }

    const retrieveThread = async (ID) => {
        console.log("threadID: " + ID)
        const docRef = doc(db, "Threads", ID)
        await getDoc(docRef)
            .then(snap => {
                console.log(snap.data())
                if (snap.exists()) {
                    setThreadData(snap.data());
                    extractVoteData(snap.data().votes)
                    retrieveCommunity(snap.data().communityID);
                }
                else {
                    console.log("This data doesn\'t exist")
                }
            })
          .catch(e => { console.log(`${e.code}: ${e.message}`)})
    }

    //retrieve data about the community that the thread belongs to
    const retrieveCommunity = async ID => {
        console.log("ID: " + ID)
        if (allCommunities !== null && allCommunities !== undefined) {
            setCommunityData(allCommunities.find(val => val.communityID === ID))
        }
        else {
            const docRef = doc(db, "Communities", ID)

            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                setCommunityData(snapshot.data())
            }
            else {
                console.log("This community doesn\'t exist")
            }
        }
    }

    //retieve all comments posted on the thread 
    const retrieveComments = async Thread_ID => {
        const q = query(collection(db, "Comments"), where("threadID", "==", Thread_ID)); 
        var newCommentsArr = []; 
        const querySnapshot = await getDocs(q)
            .then(snapshot => {
                snapshot.forEach(item => {
                    newCommentsArr.push(item.data())
                })
                setCommentArr(newCommentsArr); 
            })
            .catch(e => { console.log(`${e.code}: ${e.message}`) })
    }

    //function for processing voting data retrieved from Firebase
    /*
    const extractVoteData = () => {
        var upvotes = 0;
        var downvotes = 0; 
        threadData.votes.forEach(vote => {
            if (vote.upvote) {
                upvotes++; 
                //if the current vote is owned by the currently logged in user
                if (vote.userID == currentUserData.userID) {setUpvoted(true) }
            }
            if (vote.downvote) {
                downvotes++; 
                //if the current vote is owned by the currently logged in user
                if (vote.userID == currentUserData.userID) { setDownvoted(true)}
            }
           
        })
        //store the votes array into the voteArray useState object
        setVoteArray(threadData.votes)
        setUpvoteNum(upvotes);
        setDownvoteNum(downvotes); 
    }*/

    const extractVoteData = (data) => {
        var upvotes = 0;
        var downvotes = 0;
        console.log("data")
        console.log(data)
        for (var i in data){
            if (data[i].upvote) {
                upvotes++;
                //if the current vote is owned by the currently logged in user
                if (data[i].userID == currentUserData.userID) { setUpvoted(true) }
            }
            if (data[i].downvote) {
                downvotes++;
                //if the current vote is owned by the currently logged in user
                if (data[i].userID == currentUserData.userID) { setDownvoted(true) }
            }

        }
        //store the votes array into the voteArray useState object
        setVoteArray(data)
        setUpvoteNum(upvotes);
        setDownvoteNum(downvotes);
    }

    useEffect(() => {
        if (threadID !== null || threadID !== undefined || threadID !== '') {
            retrieveThread(threadID)
            retrieveComments(threadID)
        }
    }, [threadID])


    //This block of code is created for the purpose of updating the sorted array of comments
    //When the user votes on a comment, the sortedComments has to be updated 
    //When the user switches filter option
    useEffect(() => {
        retrieveComments(threadID)
    }, [filterOption])

    //needs to be updated when the voting gets 
    useEffect(() => {
        if (threadData !== null || threadData !== undefined) {
           // extractVoteData();
        }
    }, [threadData])

    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
        currentUserData,
        allCommunities, 
    } = useContext(AppContext);

    if (!threadID) {
        return (
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                <MainContainer>
                    <div>
                        There aren't any threads to show.
                    </div>
                     <SideBar id="ThreadSideBar">
                        {community !== undefined && community !== null ?
                            <RenderSideBar contextItem={ThreadContext} />
                            :
                            null
                        }
                    </SideBar>
                </MainContainer>
            </ThemeProvider>
        )
    }

    if (threadData === null || threadData === undefined) {
        return(<></>)
    }

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
                                author={currentUserData ? currentUserData.username : null}
                                parentID={null}
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
                        {community !== undefined && community !== null ?
                            <RenderSideBar contextItem={ThreadContext} />
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

