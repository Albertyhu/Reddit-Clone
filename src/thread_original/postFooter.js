import styled from 'styled-components'; 
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoIosShareAlt  } from 'react-icons/io';
import { IoBookmarkOutline, IoEllipsisHorizontal } from "react-icons/io5";

const RenderPostFooter = props => {
    const {
        commentNumber,
        navigateFunction
    } = props; 
    return (
        <Container>
            <Button onClick={navigateFunction}><FaRegCommentAlt style={IconStyle} /><p>{commentNumber ? commentNumber : null} Comments</p></Button>
            <Button><IoIosShareAlt style={IconStyle} /><p>Share</p></Button>
            <Button><IoBookmarkOutline style={IconStyle} /><p>Save</p></Button>
            <Dots />
        </Container>

        )
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
`

const Button = styled.div`
    display:flex; 
    whitespace: nowrap; 
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
    }

`

const IconStyle = {
    width: "24px",
    height: "24px",
    color: "#858585",
}
const Dots = () => <Button id="dots"><IoEllipsisHorizontal /></Button>
