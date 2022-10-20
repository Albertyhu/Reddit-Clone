import React, {useContext, useState, useEffect, useRef} from 'react'
import styled from 'styled-components'; 
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoIosShareAlt  } from 'react-icons/io';
import { IoBookmarkOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { AppContext } from '../components/contextItem.js'; 

const RenderPostFooter = props => {

    const { desktopView } = useContext(AppContext)
    const [displayHiddenPanel, setDisplay] = useState(false)
    const toggleDisplay = () => {
        setDisplay(prev => !prev); 
    }
    const closeDisplay = () => {
        setDisplay(false)
    } 
    const {
        commentNumber,
        navigateFunction
    } = props; 

    const MobilePanelRef = useRef(); 

    var MobilePanelElem = document.getElementById('RenderMobilePostFooter')
    const checkIfClickedOuside = event => {
        if (MobilePanelRef.current && displayHiddenPanel && !MobilePanelRef.current.contains(event.target)) {
            setDisplay(false)
        }
    }
    useEffect(() => {
        if (MobilePanelRef.current) {
            MobilePanelElem = document.getElementById('RenderMobilePostFooter'); 
        }
    }, [MobilePanelRef.current])

    const MobilePanel = () => {
        return (
            <MobileCont>
                <Dots dispatch={toggleDisplay} />
                {
                    displayHiddenPanel &&
                    <Container id="RenderMobilePostFooter" ref={MobilePanelRef}>
                    < Button onClick={() => {
                        navigateFunction();
                        closeDisplay();
                    }} ><FaRegCommentAlt style={IconStyle} /><p>{commentNumber ? commentNumber : null} Comments</p></Button >
                    <Button onClick={() => {
                        closeDisplay();
                    }}><IoIosShareAlt style={IconStyle} /><p>Share</p></Button>
                    <Button onClick={() => {
                        closeDisplay();
                    }}><IoBookmarkOutline style={IconStyle} /><p>Save</p></Button>
                    </Container>
                }

            </MobileCont>
            ) 
    }

    useEffect(() => {
        document.addEventListener('mousedown', checkIfClickedOuside); 
        return () => { document.removeEventListener('mousedown', checkIfClickedOuside); }
    }, [])

    return desktopView ?
            <Container id = "RenderPostFooter">
                < Button onClick = { navigateFunction } ><FaRegCommentAlt style={IconStyle} /><p>{commentNumber ? commentNumber : null} Comments</p></Button >
                <Button><IoIosShareAlt style={IconStyle} /><p>Share</p></Button>
                <Button><IoBookmarkOutline style={IconStyle} /><p>Save</p></Button>
                <Dots />
            </Container >
            :
            <MobilePanel />
}

export default RenderPostFooter; 

const Container = styled.div`
    height: 40px; 
    display: flex;
    & > * {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        color: #858585; 
        font-size: 12px;
        padding: 6px 4px;
        cursor: pointer; 
    }
    &#RenderMobilePostFooter{
        display: grid; 
        border: 1px solid #808080; 
        background-color: #ffffff;
        height: auto;
        z-index: 100;
        position: absolute;
    }
`

const MobileCont = styled.div`
    diplay: relative; 
`

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

const IconStyle = {
    width: "24px",
    height: "24px",
    color: "#858585",
}
const Dots = props => <Button id="dots" onClick={props.dispatch}><IoEllipsisHorizontal /></Button>
