import React, { useContext, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import SignUpArt from '../asset/images/SignUpArt.png'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AppContext } from '../components/contextItem.js'; 
import { FcGoogle } from 'react-icons/fc';

const RenderGuestPanel = props => {
    const { normalMode,
        DefaultTheme,
        DarkTheme,
        openLogIn,
        openSignUp, 
        closeGuestPanel,
        GuestPanelRef, 
        displaySignIn, 
    } = useContext(AppContext);

    const clickEvent = event => {
        if (GuestPanelRef.current && !GuestPanelRef.current.contains(event.target)) {
            closeGuestPanel(); 
        }
    }

    document.addEventListener('mousedown', clickEvent);

    useEffect(() => {
        return () => document.removeEventListener('mousedown', clickEvent);
    }, [])

    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainContainer ref={GuestPanelRef}>
                <ArtImage src={SignUpArt} /> 
                <InnerShell>
                    <DeleteWrapper><AiOutlineClose /></DeleteWrapper>
                    {displaySignIn ? null 
                        :
                        <RenderSignUp />
                        }
                </InnerShell>
            </MainContainer>
        </ThemeProvider>
        )
}

export default RenderGuestPanel; 

const RenderSignUp = props => {
    return (
        <MainContent>
            <TextBlock>
                <h2>Sign Up</h2>
                <p>By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy.</p>
            </TextBlock>
            <Form>
                <Button id="ThirdPart"><FcGoogle /> Continue with Google</Button>
                <BorderDiv>
                    <Divider />
                    <BorderText> OR </BorderText>
                    <Divider /> 
                </BorderDiv> 
                <Input placeholder="EMAIL" />
                <Button>Continue</Button>
            </Form> 
        </MainContent>
        )
}

const MainContainer = styled.div`
height: 650px;
width: 850px; 
resize: none; 
position: fixed;
border-radius: 10px; 
display: grid; 
grid-template-columns: 130px auto; 
color: ${props => props.theme.TextColor}; 
background-color: ${props => props.theme.PanelBackgroundColor}; 
z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

`
const InnerShell = styled.div`
width: 90%; 
height: 90&; 
margin: auto; 
display: grid; 
`

const MainContent = styled.div`
width: 280px;  
`

const Form = styled.div`
text-align: center; 
`

const BorderDiv = styled.div`
display: grid; 
grid-template-columns: 40% 20% 40%; 
height: 50px;
position: relative; 
margin: 10px 0px; 
`

const Divider = styled.div`
border-bottom: 1px solid #edeff1; 
position: absolute;
top: 0px; 
`

const BorderText = styled.div`
    text-align: center; 
    text-transform: uppercase; 
`

const ArtImage = styled.img`
height: 100%; 
width: 100%; 
`

const DeleteWrapper = styled.div`
justify-content: flex-end; 
width: 100%; 
`

const Button = styled.div`
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 10px 0px;
    min-width: 10px;
    witdh: fit-content;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    margin-right: 5px;
    background-color: ${props => props.theme.ButtonBackgroundC}; 
    color: ${props => props.theme.ButtonTextC}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover}; 
}
    &#ThirdParty{
          background-color: ${props => props.theme.InvertedButtonBackgroundC}; 
          color: ${props => props.theme.InvertedButtonTextC};   
    }

    &#ThirdParty:hover{
        background-color: ${props => props.theme.InvertedButtonBackgroundCHover}; 
        
    }

`

const TextBlock = styled.div`
margin: 10px 0 50px 0; 
text-align: left; 
`

const Input = styled.input`
border: 1px solid rgba(0,0,0,0.2); 
padding: 20px 10px; 
color: #a8a7a7; 
border-radius: 10px; 
margin: 10px 0;
Input:active{
    border: 1px solid #0079d3; 
}
`