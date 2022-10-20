import React, { useEffect, useState, useContext, useCallback, useMemo, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AppContext, CreatePostContext } from '../components/contextItem.js';
import RenderSideBar from '../thread/sidebar.js'; 
import {
    MainContainer,
    PanelContainer,
    SideBar,
    ErrorMessage, 
    DisplayError, 
    RemoveError, 
} from '../global/styledComponents.js'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import {
    createEditor,
    Editor,
    Transforms,
    Element as SlateElement
} from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import '../global/myStyle.css';
import { useSelection } from '../components/slateJSComponents/useSelection.js'; 
import {
    AiOutlineAlignRight,
    AiOutlineAlignCenter,
    AiOutlineAlignLeft,
} from 'react-icons/ai';
import { FaQuoteRight } from 'react-icons/fa';
import { BsExclamationTriangle, BsListUl, BsListOl } from 'react-icons/bs';
import { ImListNumbered } from 'react-icons/im';
import uuid from 'react-uuid'; 
import { getAuth } from 'firebase/auth'; 
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseComponent.js';


const auth = getAuth(); 

const ALIGN_OBJECT = {
    "alignLeft": "left",
    "alignRight": "right",
    "alignCenter": "center",
} 

//Has to be structured like RenderFeed.js architecture 
const CreatePostScreen = props => {
    const location = useLocation(); 
    const {
        community_ID,
    } = location.state; 

    const [community, setCommunity] = useState(null)

    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
        currentUserData, 
    } = useContext(AppContext);

    const CHAR_LIMIT = 300;
    const [threadTitle, setThreadTitle] = useState(''); 
    const [titleCharCont, setTitleCharCont] = useState(0); 
    const TitleRef = useRef(); 

    const [TitleBorderStyle, setTitleBorder] = useState("2px solid #d6d6d6")

    const onChangeTitle = event => {
        var userInput = event.target.value; 
        if (userInput.length <= CHAR_LIMIT) {
            setTitleCharCont(userInput.length); 
            setThreadTitle(userInput); 
        }
    }

    const RenderCharacterCont = () => {
        return (
            <CharacterCounterWrapper>
                {titleCharCont}/{CHAR_LIMIT}
            </CharacterCounterWrapper>
            )
    }

    const initialValue = [
        {
            type: "paragraph",
            children: [{ text: '' }]
        }
    ]

    const [editor] = useState(useMemo(() => withReact(createEditor()), []))
    const [response, setResponse] = useState(initialValue)
    const [selection, setSelectedOptimized] = useSelection(editor)

    //this works because the following code directly changes editor.selection
    //...which I guess tells App where user's insertion point
    //...This in turn signifies where the change in style is made every time
    //... toggleStyle() is executed 
    const onChangeHandler = useCallback((doc) => {
        setResponse(doc);
        setSelectedOptimized(editor.selection)
    }, [editor.selection, setResponse, setSelectedOptimized])

    const [borderStyle, setBorder] = useState("2px solid #d6d6d6")
    const replyRef = useRef();
    const clickEvent = e => {
        if (replyRef.current && replyRef.current.contains(e.target)) {
            setBorder("2px solid #474747")
        }
        else {
            setBorder("2px solid #d6d6d6")
        }
        if (TitleRef.current && TitleRef.current.contains(e.target)) {
            setTitleBorder("2px solid #474747")
        }
        else {
            setTitleBorder("2px solid #d6d6d6")
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickEvent)
        return () => { document.removeEventListener("mousedown", clickEvent) }

    }, [])

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} id="RenderedElement" />
            case 'bulleted':
                return <BulletedListElement  {...props} id="RenderedElement" />
            case 'orderedList':
                return <OrderedListElement  {...props} node={editor.children} id="RenderedElement" />
            case 'list-item':
                return <ListElement {...props} />;
            default:
                return <DivElement  {...props} id="RenderedElement" />
        }
    }, [])

    const LIST_TYPES = ['bulleted', 'orderedList'];
    const TEXT_ALIGN_TYPES = ['alignLeft', 'alignCenter', 'alignRight']

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])


    //This code is copied from the doc 
    //it's purpose is to find if the format is currently active 
    const isBlockActive = (editor, format, blockType = 'type') => {
        //destructure selection 
        const { selection } = editor
        if (!selection) return false
        //Array.from will return undefined if format is not active 
        const [match] = Array.from(
            Editor.nodes(editor, {
                //Editor.unhangRange converts a range into a non-hanging one.
                //Editor.unhangRange returns the location in form of anchor and focus
                //more info: https://docs.slatejs.org/api/nodes/editor
                at: Editor.unhangRange(editor, selection),
                //return true if the type of the selected content is the desired type of list
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n[blockType] === format,
            })
        )
        console.log(Editor.unhangRange(editor, selection))
        //returns a truthy value 
        //If any element 
        return !!match
    }

    //listType evalutes whether the current content is already an unordered or ordered list 
    //If the current content to be change is not the same as the listType, 
    //...this function will change the parent component into either an unordered 
    //... or ordered list, and it will change the children into a list item 
    //The opposite happens when changing the content from list to a normal paragraph
    function toggleList(editor, listType) {
        const isActive = isBlockActive(editor, listType, 'type')

        //return true if the the content is of the list type 
        const [match] = Editor.nodes(editor, {
            match: n => n.type === listType,
        })

        //Unwrap the parent nodes 
        Transforms.unwrapNodes(editor, {
            match: n => !Editor.isEditor(n)
                && LIST_TYPES.includes(n.type)
                && SlateElement.isElement(n)
            ,
            split: true
        })
        //If the type current content is already the same as the listType
        //...change the type of  the children to be a normal paragraph
        //If type of the current content is not the same as the listType, 
        //...change the type of the children to be a list-item
        //The method renderElements will render the children accordingly
        Transforms.setNodes(editor,
            { type: isActive ? 'paragraph' : match ? 'paragraph' : 'list-item' },
            {
                match: n => Editor.isBlock(editor, n)
            }
        )
        //rewrap the nodes only if the we're changing the content from a paragraph to a list 
        //Make the the type of parent nodes the same as the listType
        if (!isActive) {
            const block = {
                type: listType,
                children: []
            }
            Transforms.wrapNodes(editor, block)
        }
    }

    const getActiveStyles = (editor) => {
        //Return a set of all styles that exist
        //otherwise, return an empty object
        return new Set(Object.keys(Editor.marks(editor) ?? {}))
    }

    //returns align property that is active
    const getActiveAlignment = (editor) => {
        const [match] = Editor.nodes(editor, {
            match: n => n.align !== 'alignLeft'
        })
        return !!match;
    }


    const toggleStyle = (editor, style) => {
        const activeStyles = getActiveStyles(editor)
        if (activeStyles.has(style)) {
            Editor.removeMark(editor, style)
        }
        else
            Editor.addMark(editor, style, true)
    }

    //functional component that is responsible for the alignment functionality 
    const alignContent = (editor, alignment) => {
        const defaultAlignment = "alignLeft";
        const [match] = Editor.nodes(editor, {
            match: n => n.align === alignment
        })
        //if the current content's alignment is already  the same as the 
        //...'alignment' parameter, make the alignment of the content default 
        let newProperties = {
            align: match ? defaultAlignment : alignment,
        };
        Transforms.setNodes(editor, newProperties);
    }

    const RenderButton = props => {
        const { style } = props;
        var isActive = getActiveStyles(editor).has(style);
        if (TEXT_ALIGN_TYPES.includes(style)) {
            isActive = getActiveAlignment(editor)
        }

        var display = null;
        switch (style) {
            case 'bold':
                display = <b>B</b>;
                break;
            case 'italic':
                display = <em>i</em>;
                break;
            case 'underline':
                display = <u>u</u>;
                break;
            case 'lineThrough':
                display = <del>S</del>;
                break;
            case 'code':
                display = <span>&#60;c&#5171;</span>;
                break;
            case 'super':
                display = <span>A^</span>;
                break;
            case 'heading':
                display = <><span>T</span><span style={{ fontWeight: 'bold', fontSize: '20px' }}>T</span></>;
                break;
            case 'quote':
                display = <FaQuoteRight alt="quote block" />;
                break;
            case 'spoiler':
                display = <BsExclamationTriangle alt="spoiler" />;
                break;
            case 'bulleted':
                display = <BsListUl alt="bulleted list" />;
                break;
            case 'orderedList':
                display = <ImListNumbered alt="numbered list" />;
                break;
            case 'alignLeft':
                display = <AiOutlineAlignLeft alt="align left" />;
                break;
            case 'alignCenter':
                display = <AiOutlineAlignCenter alt="center content" />;
                break;
            case 'alignRight':
                display = <AiOutlineAlignRight alt="align right" />;
                break;
            default:
                break;
        }
        return (
            <StylingButton
                colorVal={isActive ? normalMode ? "#000000" : "#ffffff" : "#828282"}
                fWeight={isActive ? "bold" : "normal"}
                onMouseDown={event => {
                    event.preventDefault();
                    if (style === 'orderedList' || style === 'bulleted') {
                        toggleList(editor, style)
                    }
                    else if (TEXT_ALIGN_TYPES.includes(style)) {
                        alignContent(editor, style)
                    }
                    else
                        toggleStyle(editor, style)
                }}>{display}</StylingButton>
        )
    }

    const navigate = useNavigate(); 
    const ToThread = useCallback(threadID => navigate('../thread', {
        state: {
            threadID: threadID, 
            community_ID: community_ID, 
        },
    }), [navigate])

    const [DisplayTitleError, setDisplayTitleError] = useState(false); 
    const [TitleErrMess, setTitleErrMess] = useState('') 

    
    const SubmitEvent = async () => {
        setTitleErrMess('');
        //check if the reply is empty 
        var titleErrorMessage = "";
        var titleValid = true; 
        var isValid = true;
        if (threadTitle.length <= 0) {
            isValid = false;
            titleValid = false; 
            titleErrorMessage = "You must include a title for your post."; 
        }

        //The following block of code checks if the user has written anything on the text editor
        //However, I decided to leave this feature out because the on the real Reddit
        //...users can make posts without writing anything on the body of the content
        /*
        if (response.length !== 0) {
            var isEmpty = true;
            response.forEach(child => {
                child.children.forEach(val => {
                    if (val.text !== '') {
                        isEmpty = false;
                    }
                })

            })
            if (isEmpty) {
                isValid = false;
                ContentError = "Your must write something." 
            }
        }
        else {
            isValid = false; 
        }*/
    
        if (isValid) {
            const threadID = uuid();
              await setDoc(doc(db, "Threads", threadID), CreateThread(threadID))
                  .then(() => {
                      Reset(); 
                      //Need to change renderThread.js in order for this to work 
                      ToThread(threadID); 
                  })
                  .catch(error => {
                      alert(`${error.code}: ${error.message}`); 
                  })
            Reset();
        }
        else {
            setTitleErrMess(titleErrorMessage); 
            setDisplayTitleError(!titleValid); 
        }
    }


    useEffect(() => {
        setDisplayTitleError(false); 
    }, [threadTitle])

    const Reset = () => {
        setThreadTitle('');
        //The following block of code resets the editor 
        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        })
        setResponse(initialValue)
    }
    
    const CreateThread = (threadID) => {
        const currentTime = new Date(Date.now());
        var timeObj = Timestamp.fromDate(currentTime); 
        //To convert Timestamp obj back to javascript Date(), do the following 
        //dateObj = new Date(timeObj.seconds * 1000)
        var userID = auth.currentUser.uid; 
        const obj = {
            threadID: threadID,
            votes: [
                {
                    userID: userID, 
                    upvote: true, 
                    downvote: false,
                    dateVoted: timeObj,
                },
            ],
            community: community.communityTitle,
            communityID: community_ID, 
            title: threadTitle, 
            restricted: false, 
            authorID: userID, 
            authorName: currentUserData.username,  
            timePosted: timeObj, 
            textBody: JSON.stringify(response), 
            commentNumber: 0, 

        }
        return obj; 
    }

    const retrieveCommunity = async () => {
        
        const docRef = doc(db, "Communities", community_ID)
        const snapshot = await getDoc(docRef)
            .then(snap => { setCommunity(snap.data());})
            .catch(error => {
                console.log(`${error.code}: ${error.message}`)
            });
                
        };

    useEffect(() => {
        if (community === null || community === undefined)
            retrieveCommunity();
    }, [community_ID])

    const context = {
        ...community,
    }

    return (
        <CreatePostContext.Provider value={context}>
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                    <MainContainer id = "CreatePost_MainContainer">
                    <PanelContainer id="CreatePost_PanelContainer">
                        <ScreenTitle>Create a post</ScreenTitle>
                        <Container>
                            <ErrorMessage
                                FontSize={"18px"}
                                display={DisplayTitleError ? DisplayError : RemoveError}
                                Margin={"2px 0 2px 18px"}
                            >{TitleErrMess}</ErrorMessage>
                            <TitleInputWrapper borderFocus={TitleBorderStyle} ref={TitleRef}>
                                <TitleInput value={threadTitle} onChange={onChangeTitle} placeholder = "Title" />
                                <RenderCharacterCont />
                            </TitleInputWrapper>
                            <ReplyCont
                                ref={replyRef}
                                id="ReplyContainer"
                                borderFocus={borderStyle}
                                id = "ReplyCont"
                            >
                                <Slate
                                    editor={editor}
                                    value={response}
                                    // value={initialValue}
                                    id="Editable"
                                    onChange={onChangeHandler}
                                >
                                    <CommentButtonContainer>
                                        <RenderButton style='bold' />
                                        <RenderButton style='italic' />
                                        <RenderButton style='underline' />
                                        <RenderButton style='lineThrough' />
                                        <RenderButton style='code' />
                                        <RenderButton style='super' />
                                        <RenderButton style='heading' />
                                        <RenderButton style='quote' />
                                        <RenderButton style='spoiler' />
                                        <RenderButton style='bulleted' />
                                        <RenderButton style='orderedList' />
                                        <RenderButton style='alignLeft' />
                                        <RenderButton style='alignCenter' />
                                        <RenderButton style='alignRight' />
                                    </CommentButtonContainer>
                                    <Editable
                                        style={SlateStyle}
                                        renderElement={renderElement}
                                        renderLeaf={renderLeaf}
                                        placeholder="What are your thoughts?"
                                        autoFocus
                                        spellCheck={false}
                                        onKeyDown={event => {
                                            if (!event.ctrlKey) {
                                                return;
                                            }
                                            switch (event.key) {
                                                case '`': {
                                                    event.preventDefault();

                                                    const [match] = Editor.nodes(editor, {
                                                        match: n => n.type === "code",
                                                    })
                                                    Transforms.setNodes(editor,
                                                        { type: match ? "default" : "code" },
                                                        { match: n => Editor.isBlock(editor, n) }
                                                    )
                                                    break;
                                                }
                                                case 'b': {
                                                    event.preventDefault();
                                                    toggleStyle(editor, 'bold');
                                                    break;
                                                }
                                                case 'i': {
                                                    event.preventDefault();
                                                    toggleStyle(editor, 'italic')
                                                    break;
                                                }
                                                case 'u': {
                                                    event.preventDefault();
                                                    toggleStyle(editor, 'underline')
                                                    break;
                                                }
                                            }
                                        }}
                                    />
                                </Slate>
                            </ReplyCont>
                            <PostButtonContainer id = "PostButtonContainer">
                                <PostButtonWrapper id = "PostButtonWrapper">
                                    <SubmitButton onClick={() => {
                                        if (currentUserData !== null && currentUserData !== undefined) {
                                            SubmitEvent()
                                        }
                                        else {
                                            alert("You must be signed in to do that.")
                                        }
                                    }} id="PostButton">Post</SubmitButton>
                                </PostButtonWrapper>
                            </PostButtonContainer>
                        </Container> 
                        </PanelContainer>
                    <SideBar>
                            {community !== null && community !== undefined ? <RenderSideBar contextItem={CreatePostContext} /> : null}
                    </SideBar>
                </MainContainer>
            </ThemeProvider> 
        </CreatePostContext.Provider>
        )
}

export default CreatePostScreen; 


const CodeElement = props => {
    var alignment = { textAlign: ALIGN_OBJECT[props.element.align] }
    return (
        <pre {...props.attributes} style={alignment} id="CodeBlock">
            <code>{props.children}</code>
        </pre>
    )
}

const DivElement = props => {
    var alignment = { textAlign: ALIGN_OBJECT[props.element.align] }
    return (
        <div
            {...props.attributes}
            style={alignment}
            id="DefaultBlock"
        >{props.children}</div>
    )
}

const Leaf = props => {
    var element = <>{props.children}</>;
    if (props.leaf.bold) {
        element = <b>{element}</b>
    }
    if (props.leaf.italic) {
        element = <i>{element}</i>
    }
    if (props.leaf.code) {
        element = <code>{element}</code>
    }
    if (props.leaf.underline) {
        element = <u>{element}</u>
    }
    if (props.leaf.lineThrough) {
        element = <del>{element}</del>
    }
    if (props.leaf.super) {
        element = <sup>{element}</sup>
    }
    if (props.leaf.heading) {
        element = <h1>{element}</h1>
    }
    if (props.leaf.quote) {
        element = <QuoteBlock>{element}</QuoteBlock>
    }
    if (props.leaf.spoiler) {
        element = <SpoilerBlock>{element}</SpoilerBlock>
    }

    return <span {...props.attributes} >{element}</span>;
}

const DefaultElement = props => {
    var alignment = { textAlign: ALIGN_OBJECT[props.element.align] }
    return <p {...props.attributes} style={alignment}>{props.children}</p>
}

const BulletedListElement = props => {
    return <ul style={{ listStyleType: "disc" }} {...props.attributes}>{props.children}</ul>
}

const OrderedListElement = props => {
    return <ol {...props.attributes}>{props.children}</ol>
}

const ListElement = props => {
    return <li {...props.attributes}>{props.children}</li>
}

const Container = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    margin-top: ${props => props.MarginTop || 0};
    width: ${props => props.ReplyWidth || "100%"};  
    background-color: ${props => props.theme.PanelBackgroundColor}; 
    border-radius: 5px; 
    display: block;
    padding: 20px 0;
 @media screen and (max-width: 540px){
    margin: 0;
 }
`



const ReplyCont = styled.div`
    border: ${props => props.borderFocus || "2px solid #d6d6d6"}; 
    background-color: ${props => props.theme.PanelBackgroundColor};
    border-radius: 4px;
    width: 95%;
    outline: none;
    margin: 20px auto;
    color: ${props => props.theme.TextColor};
    &:focus{
      border: 2px solid #474747; 
    }
`

export const makeList = (children) => {
    var Arr = [];
    var newline = 0;
    const regEx = /\r|\n/;
    // console.log(children.length)
    /*
    for (var i = 0; i < children.length; i++) {
        if (regEx.exec(children.charAt(i))) {
            Arr.push(children.substring(newline, i))
            newline = i + 1; 
        } 
    }
    return Arr; */
}

const ReplyTextArea = styled.textarea`
    resize: none; 
    width: -webkit-fill-available; 
    outline: none;
    border-width: 0;
    margin: 5px;
    font-family: "Verdana";
`
const Gap = styled.div`
    height: 20px; 
    font-size: 12px;
    with: 90%;
    margin-left: auto;
    margin-right: auto;
    & > *{
        display: inline-block;
        font-family: Noto Sans,Arial,sans-serif;
    }
`
const UserName = styled.div`
    color: #b5b5b5; 
    margin-left: 5px;
    cursor: pointer;
    &:hover{
    text-decoration: underline;
}
`

const SlateStyle = {
    /*resize: "none", */
    /*width: "-webkit-fill-available",*/
    width: "96%",
    height: "170px",
    outline: "none",
    borderWidth: "0",
    margin: "5px",
    fontFamily: "Verdana",
    overflowY: 'auto',
    padding: "8px",
    overflowX: "hidden",
}

const StylingButton = styled.div`
//display: inline-block; 
width: 30px;
text-align: center; 
vertical-align: middle;
padding-top: 5px;
padding-bottom: 5px;
border-radius: 5px; 
background-color: ${props => props.theme.SearchBarBackgroundColor};
color: ${props => props.colorVal || "#828282"};
font-weight: ${props => props.fWeight || "normal"};
margin-left: 5px;
margin-right: 5px;
&:hover{
    background-color: #bbbbbb; 
}
`

const SubmitButton = styled.div`
border-radius: 15px;
padding: 5px 15px;
fontWeight: bold; 
font-family: "Verdana"; 
background-color: #6C6C6C;
color: #B6B6B6;
width: fit-content;
cursor: pointer;
font-size: 15px;
&:hover{
    background-color: #464646;
}
`

const CommentButtonContainer = styled.div`
width: 100%; 
height: 35px; 
display: flex;
background-color: ${props => props.theme.SearchBarBackgroundColor};
& > * {
    vertical-align: middle; 
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;
}
`

const QuoteBlock = styled.div`
border-left: 5px solid #dbdbdb;
line-height: 33px;
margin-left: 10px; 
padding-left: 10px;
`

const SpoilerBlock = styled.span`
background-color: #000000;
color: #000000; 
` 


const TitleInputWrapper = styled.div`
margin: 20px auto; 
border-radius: 5px; 
display: grid;
grid-template-columns: 90% 10%; 
color: #A0A0A0;
padding: 10px;
width: 92%;
border: ${props => props.borderFocus || "2px solid #d6d6d6"}; 
background-color: ${props => props.theme.PanelBackgroundColor}; 
`

const TitleInput = styled.input`
    text-align: left: 
    margin: 10px; 
    background-color: ${props => props.theme.PanelBackgroundColor}; 
    border: none; 
    outline: none;
    color: #A0A0A0;
`

const CharacterCounterWrapper = styled.span`
    font-weight: bold; 
    text-align: right; 
    margin: auto 10px; 
`
const PostButtonContainer = styled.div`
    color: #585858; 
    width: 100%; 


`

const PostButtonWrapper = styled.div`
    width: 95%;
    margin: auto;
    text-align: right;
    & > div#PostButton{
        margin-right: 0;
        margin-left: auto;
    }
`
const ScreenTitle = styled.div`
color: ${props => props.theme.TextColor}; 
font-size: 20px; 
font-weight: bold;
font-family: "Arial";
margin: 20px 0px; 
padding: 0 12px;
`

const Divider = styled.div`
border-bottom: 1px solid ${props => props.theme.SearchBarBackgroundColor}; 
padding: 0 12px; 
margin: 20px auto;
`