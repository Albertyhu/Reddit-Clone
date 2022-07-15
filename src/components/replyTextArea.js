import React, { useEffect, useRef, useState, useContext } from 'react'; 
import styled from 'styled-components'; 
import { ThreadContext } from './contextItem.js';

const RenderReplyTextArea = props => {
    const { ...threadData} = useContext(ThreadContext)
    const {
        marginLeft,
        marginRight,
        ReplyWidth,
        marginTop, 
        author, 
    } = props;
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
                >

                <ReplyTextArea rows={5} maxLength={10000} placeholder = "What are your thoughts? " />
                </ReplyCont>
        </Container> 
        )
}

export default RenderReplyTextArea; 

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