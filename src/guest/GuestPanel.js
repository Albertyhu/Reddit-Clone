import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import SignUpArt from '../asset/images/SignUpArt.png'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AppContext, GuestContext } from '../components/contextItem.js'; 
import { FcGoogle } from 'react-icons/fc';
import { SignInWGoogle } from '../authentication/GoogleAuth.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';
import { checkEmail } from '../components/checkEmail.js'; 
import { BsCheck } from 'react-icons/bs';

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

    //sign in objects 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = event => {
        setUsername(event.target.value)
    }

    const handlePassword = event => {
        setPassword(event.target.value)
    }

    //Sign up objects
    const [currentEmail, setCurrentEmail] = useState('');
    const handleCurrentEmailChange = event => {
        setCurrentEmail(event.target.value)
    }

    const clickEvent = event => {
        if (GuestPanelRef.current && !GuestPanelRef.current.contains(event.target)) {
            resetInput(); 
            closeGuestPanel(); 
        }
    }
    const resetInput = () => {
        setUsername('');
        setPassword('');
        setCurrentEmail('');
    } 

    document.addEventListener('mousedown', clickEvent);

    useEffect(() => {
        return () => document.removeEventListener('mousedown', clickEvent);
    }, [])

    const context = {
        username, 
        password, 
        handleUsername, 
        handlePassword, 
        currentEmail,
        handleCurrentEmailChange,
        resetInput, 
    }

    return (
        <GuestContext.Provider value={context}>
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                <MainContainer ref={GuestPanelRef}>
                    <ArtImage src={SignUpArt} /> 
                    <InnerShell id = "InnerShell">
                        <DeleteWrapper><AiOutlineClose onClick={closeGuestPanel}/></DeleteWrapper>
                        {displaySignIn ? 
                            <RenderSignIn />
                            :
                            <RenderSignUp />
                            }
                    </InnerShell>
                </MainContainer>
            </ThemeProvider>
        </GuestContext.Provider>
        )
}

export default RenderGuestPanel; 

const RenderSignUp = props => {
    const {
    } = useContext(AppContext)

    const [firstPage, setFirstPage] = useState(true);  
    const moveForward = () => {
        setFirstPage(false); 
    }
    const moveBack = () => {
        setFirstPage(true); 
    }
    return firstPage ? <RenderFirstSUPage moveForward={moveForward} />
        :
        <RenderSecondSUPage moveBack={moveBack} />
}

const DisplayError = "transform: translateY(0px); opacity: 1.0;"
const RemoveError = "transform: translateY(-10px); opacity: 0;"

const RenderFirstSUPage = props => {
    const { moveForward } = props;

    const {
        openLogIn,
    } = useContext(AppContext)

    const { currentEmail,
        handleCurrentEmailChange,
        resetInput,
    } = useContext(GuestContext);

    const [validEmail, setValidEmail] = useState(false); 
    const [error, setError] = useState(false);  
    const [errorMessage, setErrMess] = useState(''); 
    useEffect(() => {
        setValidEmail(checkEmail(currentEmail)); 
        if (error) {
            setError(false)
        }
    }, [currentEmail])

    const handleContinue = () => {
        setErrMess('')
        var message = ''
        var isValid = true; 
        if (!validEmail) {
            message += "Invalid email"
            isValid = false; 
        }

        if (isValid) {
            moveForward(); 
        }
        else {
            setErrMess(message)
            setError(true)
        }
    }

    return (
        <MainContent>
            <TextBlock>
                <h2>Sign Up</h2>
                <p>By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy.</p>
            </TextBlock>
            <Form>
                <RenderGoogleButton />
                <BorderDiv>
                    <Divider />
                    <BorderText> OR </BorderText>
                    <Divider />
                </BorderDiv>
                <InputWrapper><Input placeholder="EMAIL" value={currentEmail} onChange={handleCurrentEmailChange} /> {validEmail && <BsCheck />}</InputWrapper>
                <ErrorMessage
                    display={error ? DisplayError : RemoveError}
                >{errorMessage}</ErrorMessage>
                <Button onClick={handleContinue}>Continue</Button>
                <SwitchMethodWrapper>
                    Already a redditor?<SwitchMethod onClick={() => {
                        openLogIn();
                        resetInput();
                    }}>LOG IN</SwitchMethod>
                </SwitchMethodWrapper>
            </Form>
        </MainContent>
        )
}

const RenderSecondSUPage = props => {
    const { moveBack } = props; 
    const {
        closeGuestPanel
    } = useContext(AppContext); 

    const {
        username,
        password,
        handleUsername,
        handlePassword,
        resetInput, 
    } = useContext(GuestContext)

    //used for later
    const [isUserValid, setUserValid] = useState(false);
    const [isPassValid, setPassValid] = useState(false); 

    const [displayNameError, setNameError] = useState(false);
    const [displayPassError, setPassError] = useState(false); 
    const [usernameErrorMessage, setUsernameErrorMess] = useState('');
    const [passwordErrorMessage, setPassErrorMess] = useState('')

    const ResetError = () => {
        setNameError(false);
        setPassError(false); 
    }

    const handleSubmit = () => {
        setUsernameErrorMess('');
        setPassErrorMess('')
        var userValid = true; 
        var passwordValid = true;
        var usernameMessage = '';
        var passwordMessage = ''; 
        if (username === '') {
            userValid = false; 
            usernameMessage = "Please, provide your username.";
        }
        if (password.length < 6) {
            passwordValid = false; 
            passwordMessage = "Your password must be 6 characters or more."; 
        }
        if (userValid && passwordValid) {
            closeGuestPanel();
            resetInput(); 
        }
        else {
            setNameError(!userValid);
            setPassError(!passwordValid);
            setUsernameErrorMess(usernameMessage);
            setPassErrorMess(passwordMessage); 
        }
    }

    useEffect(() => {
        if (displayNameError)
            setNameError(false)
    }, [username])

    useEffect(() => {
        if (displayPassError)
            setPassError(false)
    }, [password])

    return (
        <MainContent>
            <TextBlock>
                <h2>Choose your username</h2>
                <p>Your username is how other community members will see you. This name will be used to credit you for things you share on Reddit. What should we call you?</p>
            </TextBlock>
            <Form id ="SecondForm">
                <InputWrapper><Input placeholder="USERNAME" value={username} onChange={handleUsername} /></InputWrapper>
                <ErrorMessage display={displayNameError ? DisplayError : RemoveError}>{usernameErrorMessage}</ErrorMessage>
                <InputWrapper><Input placeholder="PASSWORD" value={password} onChange={handlePassword} /></InputWrapper>
                <ErrorMessage display={displayPassError ? DisplayError : RemoveError}>{passwordErrorMessage}</ErrorMessage>
            </Form>
            <Button onClick={handleSubmit}>SignUp</Button>
            <SwitchMethodWrapper>
                <SwitchMethod onClick={moveBack}>Back</SwitchMethod>
            </SwitchMethodWrapper>
        </MainContent>
        )
}

const RenderSignIn = props => {
    const { openSignUp,
    } = useContext(AppContext)
    const { username,
        password,
        handleUsername,
        handlePassword,
        resetInput,
    } = useContext(GuestContext); 

    return (
        <MainContent>
            <TextBlock>
                <h2>Sign In</h2>
                <p>By continuing, you agree to our User Agreement and Privacy Policy.</p>
            </TextBlock>
            <Form>
                <RenderGoogleButton />
                <BorderDiv>
                    <Divider />
                    <BorderText> OR </BorderText>
                    <Divider />
                </BorderDiv>
                <InputWrapper><Input placeholder="USERNAME" value={username} onChange={handleUsername} /></InputWrapper>
                <InputWrapper><Input placeholder="PASSWORD" value={password} onChange={handlePassword} /></InputWrapper>
                <Button>Continue</Button>
                <SwitchMethodWrapper>
                    New to Reddit?<SwitchMethod onClick={() => {
                        openSignUp();
                        resetInput();
                    }}>SIGN UP</SwitchMethod>
                </SwitchMethodWrapper>
            </Form>
        </MainContent>
    )
}

const RenderGoogleButton = () => <Button id="ThirdParty" onClick={SignInWGoogle}><FcGoogle /><span>Continue with Google</span></Button>


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
    font-family: "Verdana";
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

`
const InnerShell = styled.div`
width: 90%; 
height: 90%; 
margin: auto; 
display: grid; 
`

const MainContent = styled.div`
width: 280px;  
`

const Form = styled.div`
text-align: center; 
margin-bottom: 20px;

`

const BorderDiv = styled.div`
display: grid; 
grid-template-columns: 40% 20% 40%; 
height: 50px;
position: relative; 
margin: 10px 0px; 
`

const Divider = styled.div`
border-bottom: 1px solid ${props => props.theme.SoftTextColor}; 
top: 0px; 
display: block; 
width: auto; 
height: 50%; 
`

const BorderText = styled.div`
    text-align: center; 
    text-transform: uppercase; 
    margin: auto 10px;
    color: #878a8c;
    font-size: 15px;
`

const ArtImage = styled.img`
height: 100%; 
width: 100%; 
border-radius: 10px 0 0 10px; 
`

const DeleteWrapper = styled.div`
justify-content: flex-end; 
width: 100%; 
text-align: right;
color: ${props => props.theme.BlackWhite};
& > * {
cursor: pointer;
}
`

const Button = styled.div`
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 10px;
    margin-right: 5px;
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
    user-select: none;
    background-color: ${props => props.theme.ButtonBackgroundC}; 
    color: ${props => props.theme.ButtonTextC}; 
    z-index: 10;
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover}; 
}
    &#ThirdParty{
        background-color: ${props => props.theme.InvertedButtonBackgroundC}; 
        color: ${props => props.theme.InvertedButtonTextC};
        justify-content: space-between; 
        border: ${props => props.theme.GuestInputBorder}; 
    }
    &#ThirdParty>*{
        margin: 0 20px;
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
border: none; 
color: ${props => props.theme.TextColor}; 
    &:focus {
    border: none;
    outline: none;
    }
`

const InputWrapper = styled.div`
border: ${props => props.theme.GuestInputBorder};
padding: 12px 10px; 
border-radius: 10px;
margin-top: 40px;
width: 91%;
display: flex; 
justify-content: space-between; 
background-color: ${props => props.theme.PanelBackgroundColor};
&:focus{
    border: 1px solid #0079d3; 
}
`

const SwitchMethodWrapper = styled.div`
    font-size: 12px; 
    text-align: left;
`

const SwitchMethod = styled.span`
    user-select: none; 
    color: blue, 
    text-transform: uppercase; 
    margin-left: 5px; 
    cursor: pointer;    
`

const ErrorMessage = styled.div`
    text-align: left;
    font-size: 12px; 
    color: red; 
    ${props => props.display};
    margin: 5px 0;
    transition: transform 0.5s ease-in, opacity 0.5s ease-in; 
    transition-delay: 0.1s;
    z-index: 0;
    user-select: none;
    position: absolute;
`