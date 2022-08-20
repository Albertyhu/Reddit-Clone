import { useContext, useEffect, useState } from 'react'; 
import { downArrow, upArrow, upvote, downvote, UpArrowDarkMode, DownArrowDarkMode  } from '../asset/icons'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from './contextItem.js'; 
import { doc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';

//requires passing data through useContext 
//The element that wraps this component needs to have a width of at least 30px in order for 
//... the elements of this component to align 

//Go to render thread for writing the appropriate code for drawing voting info from firebase 
//This function can used for the threads in a feed or the comments in a thread post
export const RenderVerticalVoting = props => {
    const { contextType } = props; 
    const [shouldUpdate, setShouldUpdate] = useState(false);  
    const {
        upvoted,
        downvoted, 
        upvoteNum,
        downvoteNum, 
        changeUpvoted,
        changeDownvoted,
        changeUpvoteNum,
        changeDownvoteNum,
        voteArray,
        ID, 

        //Threads use vertical alignment. Comments use horizontal alignment 
        isVertical, 

        //This tells the component if the update is made on a thread or a comment 
        FirestoreCollectionType, 

        //The following four items are no longer in use
        index, 
        sortedArray, 
        dispatchFunction, 
        shouldUpdateSortedArray, 

    } = useContext(contextType); 

    const {
        normalMode, 
        DefaultTheme, 
        DarkTheme, 
        currentUserData, 
    } = useContext(AppContext);

    const upvoteOnclick = () => {
        if (currentUserData !== null && currentUserData !== undefined) {
            if (upvoted) {
                changeUpvoted(false)
                changeUpvoteNum(prev => prev - 1)
            }
            else {
                changeUpvoted(true)
                changeUpvoteNum(prev => prev + 1)
                if (downvoted) {
                    changeDownvoted(false)
                    changeDownvoteNum(prev => prev - 1)
                }
            }
            setShouldUpdate(true)
        }
        else {
            alert('You must be signed in as a registered user to do that.')
        }
    }

    const downvoteOnclick = () => {
        if (currentUserData !== null && currentUserData !== undefined) {
            if (downvoted) {
                changeDownvoted(false)
                changeDownvoteNum(prev => prev - 1)
            }
            else {
                changeDownvoted(true)
                changeDownvoteNum(prev => prev + 1)
                if (upvoted) {
                    changeUpvoteNum(prev => prev - 1)
                    changeUpvoted(false)
                }
            }
                setShouldUpdate(true)
        }
        else {
            alert('You must be signed in as a registered user to do that.')
        }

    }

    const UpdateVoteInFirestore = async (timeObj) => {
        var docRef = doc(db, FirestoreCollectionType, ID); 
        var updatedVote = {
            dateVoted: timeObj,
            upvote: upvoted,
            downvote: downvoted,
            userID: currentUserData.userID,
        } 
        var arr = voteArray.filter(item => item.userID !== currentUserData.userID); 
        arr.push(updatedVote)
        try {
            await updateDoc(docRef, {
                votes: arr,
            })
        } catch (e) { console.log(`${e.code}: ${e.message}`) }
    }

    //NO LONGER IN USE: The reason is that this method causes the sorted array for comments/threads to rerender
    //...this in turn causes the voting components to flicker
    //The alternative solution is not update the sorted array when the user votes on the comment/thread,
    //...but only update it when the user switches filter option or thread/renderfeed reloads. 
    //Whenever the user votes on a thread/comment, not only does the thread/comment need to be updated in firestore
    //...but it also needs to be updated in the useState array that renders the tree 
    //What is needed for the parent components
    //sortedArray
    //dispatchFunction
    //index
    const updateVoteInSortedArray = (timeObj) => {
        //copy the entire thread/comment array, but leave out the one thread/comment that is to be updated 
        var tempArr = sortedArray.filter((val, ind) => ind !== index );
        //copy the one thread/comment that is to be updated 
        var updatedObj = sortedArray[index];
        //copy the votes, but leave out the vote that is to be updated, if it exists 
        var voteArray = updatedObj.votes.filter(val => val.userID !== currentUserData.userID)

        //created a new vote item based on the updated situation 
        var newVote = {
            dateVoted: timeObj,
            upvote: upvoted,
            downvote: downvoted,
            userID: currentUserData.userID,
        }
        //add the vote into the voteArray
        voteArray.push(newVote);
        //give the vote array of the thread/comment a new array
        updatedObj.votes = voteArray

        //add the updated thread/comment to the thread/comment array
        tempArr.splice(index, 0, updatedObj)

        //give the useState sortedArray object a new value 
        dispatchFunction(tempArr);
    }

  //  var sideMarginValue = isVertical ? "0px" : "0px"; 
    var iconSize = isVertical ? "24px" : "20px"

    //This part is necessary
    //This updates the user's vote in firestore whenever the thread/comment is upvoted or downvoted. 
    //The if-statement is used to prevent useEffect from executing the body of the code whenever the voting component is mounted
    useEffect(() => {
        if (shouldUpdate) {
            const currentTime = new Date(Date.now());
            var timeObj = Timestamp.fromDate(currentTime); 
            UpdateVoteInFirestore(timeObj);
            setShouldUpdate(false)
            if (shouldUpdateSortedArray) {
                updateVoteInSortedArray(timeObj)
            }
        }
    }, [upvoted, downvoted])

    return (
        <ThemeProvider theme = {normalMode ? DefaultTheme : DarkTheme}>
            <Container
                Display={isVertical ? "block" : "flex"}
                Width={isVertical ? "auto" : "70px"}
                id = "Container"
            >
                {upvoted ?
                    <VoteIcon
                        src={upvote}
                        onClick={upvoteOnclick}
                        SideMargin={"0px"}
                        Size={iconSize} />
                    :
                    <VoteIcon
                        src={normalMode ? upArrow : UpArrowDarkMode}
                        onClick={upvoteOnclick}
                        SideMargin={"0px"}
                        Size={iconSize} 
                    />
                }
                {upvoteNum !== undefined && downvoteNum !== undefined ? 
                    <VoteNumber>{upvoteNum - downvoteNum}</VoteNumber>
                    :
                    <></>
                    }
                {downvoted ?
                    <VoteIcon
                        src={downvote}
                        onClick={downvoteOnclick}
                        SideMargin={"0px"}
                        Size={iconSize} 
                    />
                    :
                    <VoteIcon
                        src={normalMode ? downArrow : DownArrowDarkMode}
                        onClick={downvoteOnclick}
                        SideMargin={"0px"}
                        Size={iconSize} 
                    />
                }
                </Container>
            </ThemeProvider>
        )
}

const Container = styled.div`
    text-align: center; 
    display: ${props => props.Display || "block"};
    width: ${props => props.Width || "auto"}; 
    resize: none;
`

const VoteIcon = styled.img`
width: ${props => props.Size || "24px"}; 
height: ${props => props.Size || "24px"}; 
margin: auto ${props => props.SideMargin || "0px"};
cursor: pointer;
`

const VoteNumber = styled.div`
margin-left: auto;
margin-right: auto;
margin-top: auto;
margin-bottom: auto;
font-weight: bold;
font-size: 12px;
font-family: "Verdana";
resize: none;
width: 30px;
color: ${props => props.theme.TextColor}; 
`
