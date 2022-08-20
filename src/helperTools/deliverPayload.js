import { UploadCommunities, AddCommunities } from '../helperTools/uploadToFirestore.js'; 
import styled from 'styled-components'; 
import { useLocation } from 'react-router'

const RenderPayloadDeliverer = () => {

    const handleEvent = () => {
        try {
            //AddCommunities();
            alert("Payload successfully delivered")
        } catch (e) { alert(`${e.code}: ${e.message}`)}
    }
    return (
        <MainContainer>
            <SubmitButton onClick={handleEvent}>Deliver Payload</SubmitButton>
        </MainContainer>
        )
}

export default RenderPayloadDeliverer; 

const MainContainer = styled.div`
width: 100%; 
text-align: center; 
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
margin: 50px auto;
&:hover{
    background-color: #464646;
}
`