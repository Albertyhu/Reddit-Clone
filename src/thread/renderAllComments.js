import React, { useState, useContext, useEffect } from 'react';
import Comment from '../components/comment.js';
import styled from "styled-components"; 
import { ThreadContext, RenderAllCommentsContext } from '../components/contextItem.js'; 
import { SortArray } from '../sort/sortMethods.js'; 
import uuid from 'react-uuid'; 
//Overall Goal: 
//Pass the array of comments to a function that gathers all the parents and returns it
//Use one of the sorting methods to sort that array 
//Gather the direct children of those parents 
//Sort them 
//Look for the children of those children
//repeat until there aren't any children left 

const RenderAllComments = () => {
    //commentArr stores all the comments of the thread, but they are not 
    //...sorted in the right order yet.
    //ThreadContext provides information from renderThread.js 
    const {
        filterOption,
        commentArr,
    } = useContext(ThreadContext)
    //contains the sorted comments. The sorting will be handled in renderAllComments.js'; 
    const [sortedComments, setSortedCom] = useState([]);
    useEffect(() => {
        const MyPromise = new Promise((resolve, reject) => {
            resolve(CreateCommentTree(commentArr, null, filterOption));
        })
        MyPromise.then(function (arrayVal) {
            //The following two lines of code is written to make sure that 
            //... there aren't any duplicates of children and ancestors
            //This is necessary because for some reason, the app rerenders
            //...multiples times. This is a bandaid solution to a problem 
            //...I couldn't solve
            arrayVal = removeDuplicates(arrayVal, "children")
            arrayVal = removeDuplicates(arrayVal, "ancestors")

            //remove any elements in the ancestor array of each object that
            //is the same as the object's commentID 
            //then store all the comments in sortedComments
            arrayVal = removeClone(arrayVal, "children")
            setSortedCom(removeClone(arrayVal, "ancestors"))
        })
    }, [commentArr])
      
    const context = {
        sortedComments,
        getSortedComments: () => sortedComments,
        setSortedCom,
    }

    return (
        <RenderAllCommentsContext.Provider value = {context}>
            <Container id="RenderAllCommentsContainer">
                {sortedComments !== null && sortedComments.length !== 0 ? 
                    sortedComments.map((elem, ind) => <Comment
                        {...elem}
                        CommentIndex={ind}
                        key={uuid()}
                    />)
                    :
                    null
                    }
            </Container>
        </RenderAllCommentsContext.Provider>
        )
}

export default RenderAllComments; 


//gather all comments with the parentID in a single array. 
//comments that are first generation, meaning 
//...they are not replies to any other comment will have parentID of 
//...null or ''
const GatherComments = (data, parentID )=> {
    return data.filter(elem => elem.parentComment === parentID)
}

//This is a recursive function 
//returns an array of all comments in the right order so they can be rendered correctly
//When passing the function for expanding and collapsing a parent and its children
//use DOM manipulation 
const CreateCommentTree = (data, parentID, sortMethod) => {
    //Gather the children 
    var arr = GatherComments(data, parentID) 

    //ends recursion 
    if (arr === null || arr.length === 0) {
        return null; 
    }

    //sort the array of children
    arr = SortArray(arr, sortMethod); 
    if (arr !== null && arr.length !== 0) {
        arr.forEach(async (elem, ind) => {
            var childArr = await CreateCommentTree(data, elem.commentID, sortMethod)
            if (childArr !== null && childArr.length !== 0) {
                //Get the position of where to insert the child comments 
                //usually the position is right after the parent comment
                //Then, it's the position right after every inserted child comment
                var insert = arr.indexOf(elem) + 1;
                childArr.forEach((child, idx) => {
                    //The following code is to pass on the commentID of the 
                    //...the parents to its children. 
                    if (child.ancestors === null || child.ancestors === undefined || child.ancestors.length === 0) {
                        var AncestorsArr = [elem.commentID]
                        child.ancestors = AncestorsArr
                    }
                    else {
                        if (!child.ancestors.some(val => val.commentID === elem.commentID)) {
                            var AncestorsArr = child.ancestors;
                            AncestorsArr.push(elem.commentID);
                            child.ancestors = AncestorsArr
                        }
                    }

                    //The following allows the parent to store the children's ID's
                    //This is for the threadline functionality.
                    var ChildrenArr = []; 

                    if (child.children !== undefined && child.children !== null && child.children.length !== 0) {
                        ChildrenArr = child.children;
                    }

                    if(!ChildrenArr.some(val => val === child.commentID))
                        ChildrenArr.unshift(child.commentID)

                    if (elem.children === undefined || elem.children === null || elem.children.length === 0) {
                        arr[arr.indexOf(elem)].children = ChildrenArr
                    }
                    else {

                        //The following commented code are failed attempts 
                        //... at creating the children array properly
                        //... It was hard trying to deal with the 
                        //...asynchronous factor of recursion 
                        //elem.children.concat(ChildrenArr)
                       // arr[arr.indexOf(elem)].children.concat(ChildrenArr)
                       //elem.children.push(...ChildrenArr)
                        //var finalArr = [...elem.children, ...ChildrenArr];
                       // elem.children = finalArr;
                        ChildrenArr.forEach(val => {
                            if (elem.commentID !== val) {
                                if(!elem.children.some(child => child === val))
                                     elem.children.push(val)
                            }
                        })

                    }

                    if (insert < arr.length) { 
                        //note to self: Don't write arr = arr.splice(); it caused me a lot of time and pain
                        arr.splice(insert, 0, child)
                        //As the array of comments grow, the pointer must keep up track of where to put the next child comment
                        insert++;
                    }
                    else {
                        arr.push(child)
                        insert++;
                    }
               })
            }
        })
    }
    return arr; 
}

//removes clones of commentID from ancestors and children 
function removeClone(commentArr, property) {
    var arr = commentArr; 
    if (arr !== undefined && arr !== null) {
        arr.forEach(elem => {
            if (elem[property] !== undefined && elem[property] !== null) {
                if (elem[property].some(val => val === elem.commentID)) {
                    var tempArr = elem[property].filter(val => val !== elem.commentID)
                    elem[property] = tempArr; 
                }
            }
        })
    }
    return arr; 
}

//removes duplicates in an array of a comment 
//This only serves as bandaid to an issue of the app re-rendering and 
//the functions adding redundant data into the array. 
function removeDuplicates(arr, property) {
    var obj = arr; 
    obj.forEach(elem => {
        if (elem[property] !== undefined && elem[property] !== null) {
            var tempArr = elem[property]
            elem[`${property}`] = [...new Set(tempArr)]
        }
    })
    return obj; 
}

const Container = styled.div`
    width: 100%; 
    background-color: ${props => props.theme.ContentBodyBackgroundColor || "#fff" };
    color: ${props => props.theme.TextColor || "#000000"};
    padding-bottom: 20px;
    border-radius: 0 0 5px 5px;
`