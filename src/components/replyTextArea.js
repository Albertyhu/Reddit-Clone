import React, { useEffect, useRef, useState, useContext, useMemo, useCallback } from 'react'; 
import styled from 'styled-components'; 
import { ThreadContext } from './contextItem.js';
// Import the Slate editor factory.
import {
    createEditor,
    Editor,
    Transforms,
    Text,
    Node,
    Element as SlateElement
} from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'; 
import '../global/myStyle.css'; 
import { useSelection } from './slateJSComponents/useSelection.js'; 
import { AiOutlineStrikethrough,
    AiOutlineAlignRight,
    AiOutlineAlignCenter, 
    AiOutlineAlignLeft, 
    AiOutlineUndo, 
 } from 'react-icons/ai';
import { FaQuoteRight } from 'react-icons/fa';
import { BsExclamationTriangle, BsListUl, BsListOl } from 'react-icons/bs';
import { ImListNumbered } from 'react-icons/im';

const ALIGN_OBJECT = {
    "alignLeft": "left",
    "alignRight": "right",
    "alignCenter": "center",
} 

const RenderReplyTextArea = props => {
    const {
        commentArr,
        setCommentArr,
    } = useContext(ThreadContext)
    const {
        marginLeft,
        marginRight,
        ReplyWidth,
        marginTop,
        author,
    } = props;

    //  const editor = useMemo(()=> withReact(withHistory(createEditor())), [])
    // const [editor] = useState(() => withReact(createEditor()))
    /*
    const initialValue = [
        {
            children: [{
                type: "paragraph",
                text: ''
            }],
        }
    ]
    */
    const initialValue = [
        {
            type: "paragraph",
            children: [{ text: '' }]
        }
    ]

    const [editor] = useState(useMemo(() => withReact(createEditor()), []))
    const [response, setResponse] = useState(initialValue)

    //const [selectedText, setSelected] = useState(editor.selection); 
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
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickEvent)
        return () => { document.removeEventListener("mousedown", clickEvent) }

    }, [])

    const [slateElement, setSlateEle] = useState(null)

    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isStrikeThrough, setIsStrikeThrough] = useState(false)
    const [isCode, setIsCode] = useState(false)
    const [isSuper, setIsSuper] = useState(false)
    const [isHeading, setIsHeading] = useState(false)

    const renderElement = useCallback(props => {
        console.log(props.element.type)
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} id="RenderedElement" />
            case 'bulleted':
                return <BulletedListElement  {...props} id="RenderedElement"/>
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

    //not in use
    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.bold === true,
                //universal: true,
            })
            return !!match
        },

        isCodeBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
            })
            return !!match
        },

        toggleBoldMark(editor) {
            const isActive = CustomEditor.isBoldMarkActive(editor)

            Transforms.setNodes(
                editor,
                {
                    bold: isActive ? null : true
                },
                { match: n => Text.isText(n), split: true }
            )
        },

        toggleCodeBlock(editor) {
            const isActive = CustomEditor.isCodeBlockActive(editor)
            setIsCode(!isActive)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'code' },
                { match: n => Editor.isBlock(editor, n) }
            )
        },
    }

    function toggleBulleted(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'bulleted',
        })
        Transforms.setNodes(editor,
            { type: match ? 'default' : 'bulleted' },
            {
                match: n => Editor.isBlock(editor, n)
            }
        )
    }

    function toggleOrderedList(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'orderedList',
        })

        Transforms.unwrapNodes(editor, {
            match: n => !Editor.isEditor(n)
                && LIST_TYPES.includes(n.type)
                && SlateElement.isElement(n)
            ,
            split: true
        })
        
        Transforms.setNodes(editor,
            { type: match ? 'default' : 'list-item' },
            {
                match: n => Editor.isBlock(editor, n)
            }
        )
        const block = {
            type: 'orderedList',
            children: []
        }
       Transforms.wrapNodes(editor, block)
    }

    const isBlockActive = (editor, format, blockType = 'type') => {
        const { selection } = editor
        if (!selection) return false
        const [match] = Array.from(
            Editor.nodes(editor, {
                //The SlateJS document doesn't explain what unhanRange does
                //...but it still does want I want it to do
                at: Editor.unhangRange(editor, selection),
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n[blockType] === format,
            })
        )
        return !!match
    }
   
    function toggleList(editor, listType) {
        const isActive = isBlockActive(editor, listType, 'type')
        const [match] = Editor.nodes(editor, {
            match: n=> n.type === listType,
        })
        Transforms.unwrapNodes(editor, {
            match: n => !Editor.isEditor(n)
                && LIST_TYPES.includes(n.type)
                && SlateElement.isElement(n)
            ,
            split: true
        })

        //this only executes if the current content is already a list-item 
            Transforms.setNodes(editor,
                { type: isActive ? 'paragraph' : match ? 'paragraph' : 'list-item' },
                {
                    match: n => Editor.isBlock(editor, n)
                }
        )
        if (!isActive) {
            const block = {
                type: listType,
                children: []
            }
            Transforms.wrapNodes(editor, block)
        }
    }

    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false;
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

    const alignContent = (editor, alignment) => {
        const defaultAlignment =  "alignLeft"; 
        const [match] = Editor.nodes(editor, {
            match: n => n.align === alignment
        })
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
                display= <><span>T</span><span style={{ fontWeight: 'bold', fontSize: '20px'}}>T</span></>;
                break; 
            case 'quote':
                display = <FaQuoteRight alt = "quote block" />;
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
                colorVal={isActive ? "#000000" : "#828282"}
                fWeight={isActive ? "bold" : "normal"}
                onMouseDown={event => {
                    event.preventDefault();
                    if (style === 'orderedList' || style === 'bulleted') {
                        toggleList(editor, style)
                    }
                    else if(TEXT_ALIGN_TYPES.includes(style)){
                        alignContent(editor, style)
                    }
                    else
                        toggleStyle(editor, style)
                }}>{display}</StylingButton>
        )
    }

    const consoleType = () => {
        console.log(editor)
    }

    const CheckIfBulleted = (editor) => {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'bulleted',
        })
        return match;
    }

    const CheckIfOrderedList = (editor) => {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'orderedList',
        })
        return match;
    }

    const SubmitEvent = () => {
        //check if the reply is empty 
        var isValid = false; 
        if (response.length !== 0) {
            response.forEach(child => {
                child.children.forEach(val => {
                    if (val.text !== '') {
                        isValid = true;
                    }
                })

            })
        }
        
        //if it is not empty, execute the following block of code
        if (isValid) {
                // Save the value to Local Storage.
                const content = JSON.stringify(response)
                console.log(content)
                localStorage.setItem('content', content)

            //The following block of code resets the editor 
            Transforms.delete(editor, {
                at: {
                    anchor: Editor.start(editor, []),
                    focus: Editor.end(editor, []),
                },
            })
            setResponse(initialValue)
        }
    }

    return (
        <Container
            borderFocus={borderStyle}
            MarginLeft={marginLeft}
            MarginRight={marginRight}
            MarginTop={marginTop}
            ReplyWidth={ReplyWidth}
        >
                {author ?
                    <Gap><span>Comment as </span><UserName>{author}</UserName></Gap>
                    :
                    null
                }
                <ReplyCont
                ref={replyRef}
                id="ReplyContainer"
                borderFocus={borderStyle}
                >
                <Slate
                    editor={editor}
                    value={response}
                   // value={initialValue}
                    id="Editable"
                    onChange={onChangeHandler}
                >
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
                        <SubmitButton
                            onMouseDown={SubmitEvent}
                        >Comment</SubmitButton>
                    </CommentButtonContainer>
                </Slate>
                </ReplyCont>
        </Container> 
        )
}

export default RenderReplyTextArea; 

const CodeElement = props => {
    var alignment = { textAlign: ALIGN_OBJECT[props.element.align] }
    return (
        <pre {...props.attributes} style={alignment} id ="CodeBlock">
            <code>{props.children}</code>
        </pre>
    )
}

const DivElement = props => {
    var alignment = { textAlign: ALIGN_OBJECT[props.element.align]}
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
    /*
    if (props.leaf.bulleted || props.leaf.orderedList) {
        return <li {...props.attributes} >{element}</li>
    }*/

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

const AlignElement = styled.div`
    text-align: ${props => props.textAlignment}; 
`

/*
const OrderedListElement = props => {
    const { node } = props; 
    return <ol {...props.attributes}>
        {node.map(n => <li>{Node.string(n)}</li>)}
    </ol>
}
*/
const ListElement = props => {
    return <li {...props.attributes}>{props.children}</li>
}

const Container = styled.div`
    margin-left: ${props => props.MarginLeft || "10px"};
    margin-right: ${props => props.MarginRight || "10px"};
    margin-top: ${props => props.MarginTop || 0};
    width: ${props => props.ReplyWidth || "100%"};    
`

const ReplyCont = styled.div`
    border: ${props => props.borderFocus || "2px solid #d6d6d6"}; 
    border-radius: 4px;
    width: 100%;
    outline: none;
    margin-bottom: 20px;
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
    resize: "none", 
    width: "-webkit-fill-available",
    height: "170px",
    outline: "none",
    borderWidth: "0",
    margin: "5px",
    fontFamily: "Verdana",
    overflowY: 'auto',
}


const StylingButton = styled.div`
//display: inline-block; 
width: 30px;
text-align: center; 
vertical-align: middle;
padding-top: 5px;
padding-bottom: 5px;
border-radius: 5px; 
background-color: #e5e5e5;
color: ${props => props.colorVal || "#828282"};
font-weight: ${props => props.fWeight || "normal" };
margin-left: 5px;
margin-right: 5px;
&:hover{
    background-color: #bbbbbb; 
}
`

const SubmitButton = styled.div`
border-radius: 15px;
padding-left: 10px; 
padding-right: 10px; 
fontWeight: bold; 
background-color: #0a73dd; 
color: #ffffff;
//display: inline-block; 

padding-top: 5px;
padding-bottom: 5px;
`

const CommentButtonContainer = styled.div`
width: 100%; 
height: 35px; 
display: flex;
background-color: #e5e5e5;
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
