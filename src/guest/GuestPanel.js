import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import SignUpArt from '../asset/images/SignUpArt.png'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AppContext, GuestContext } from '../components/contextItem.js'; 
import { FcGoogle } from 'react-icons/fc';
import { SignInWGoogle, SignUpWGoogle  } from '../firebaseMethod/GoogleAuth.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, createUser  } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';
import { checkEmail } from '../components/checkEmail.js'; 
import { BsCheck } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";

const auth = getAuth(); 

const RenderGuestPanel = props => {
    const { normalMode,
        DefaultTheme,
        DarkTheme,
        openLogIn,
        openSignUp, 
        closeGuestPanel,
        GuestPanelRef, 
        displaySignIn, 
        getUserName, 
        setCurrentUserData,
        setCurrentUser, 
    } = useContext(AppContext);

    //sign in objects 
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const [userList, setUserList] = useState(null);  

    const [GoogleID, setGoogleID] = useState(null); 

    const handleUsername = event => {
        setUsername(event.target.value)
    }

    const handlePassword = event => {
        setPassword(event.target.value)
    }

    //Sign up objects
    const [currentEmail, setCurrentEmail] = useState('');

    const handleCurrentEmailChange = event => {
        setCurrentEmail(event.target.value);
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

    const uploadUserList = async () => {
        var Arr = []; 
        const q = query(collection(db, 'users')); 
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            Arr.push(doc.data())
        })
        setUserList(Arr)
    }

    const CheckIfEmailExists = email => {
        if (userList !== null && userList !== undefined) {
            return userList.some(user => user.email.toLowerCase() === email.toLowerCase().split(' ').join(''))
        }
        return false; 
    }

    const CheckIfUserNameExists = userN => {
        if (userList !== null && userList !== undefined) {
            return userList.some(user => user.username === userN.split(' ').join(''))
        }
        return false; 
    }

    //This is created just for insurance 
    // After an account is created, it adds the new username and email to the useState userList
    const addUserToList = (userN, emailAddress, ID) => {
        setUserList(prev => [...prev, {username: userN, email: emailAddress, userID: ID}])
    }
   
    useEffect(() => {
        if (userList === null || userList === undefined ) {
            uploadUserList();
        }

        return () => { document.removeEventListener('mousedown', clickEvent); };
    }, [])

    const createNewAccount = async () => {
        setLoading(true); 
        //If the account is created with Google Sign In
        if (GoogleID !== null && GoogleID !== undefined) {
            await setDoc(doc(db, 'users', GoogleID), {
                email: currentEmail.toLowerCase(),
                username: userName,
                userID: GoogleID,
                Karma: 0, 
                communityMembership: [], 
            }).then(() => {
                setCurrentUserData({
                    email: currentEmail.toLowerCase(),
                    username: userName,
                    userID: GoogleID,
                    Karma: 0, 
                    communityMembership: [], 
                })
                addUserToList(userName, currentEmail.toLowerCase(), GoogleID);
                resetInput();
                closeGuestPanel();
            })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert("The email you typed is already in use.")
                    }
                    else
                        alert(error.code + ": " + error.message)
                })
        }
        //If account is created with email and password 
        else {
            createUserWithEmailAndPassword(auth, currentEmail, password)
                .then(async (userCredentials) => {
                    await setDoc(doc(db, 'users', auth.currentUser.uid), {
                        email: currentEmail.toLowerCase(),
                        username: userName.split(' ').join(''),
                        userID: auth.currentUser.uid,
                        Karma: 0,
                        communityMembership: [], 
                    })
                    setCurrentUserData({
                        email: currentEmail.toLowerCase(),
                        username: userName,
                        userID: auth.currentUser.uid,
                        Karma: 0,
                        communityMembership: [], 
                    })
                    console.log("success!")
                    addUserToList(userName, currentEmail.toLowerCase(), auth.currentUser.uid);
                    resetInput();
                    closeGuestPanel();
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert("The email you typed is already in use.")
                    }
                    else
                        alert(error.code + ": " + error.message)
                })
        }
        setLoading(false)
    } 

    const handleSignIn = async () => {
        var userData = userList.find(item => item.username === userName); 
        setLoading(true)
        await signInWithEmailAndPassword(auth, userData.email, password)
            .then(() => {
                setCurrentUserData(userData); 
                setCurrentUser(getUserName()); 
                setLoading(false);
                resetInput();
                closeGuestPanel();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                AlertError(errorCode);
                setLoading(false);
            });

    }

    const context = {
        userName, 
        password, 
        handleUsername, 
        handlePassword, 
        currentEmail,
        handleCurrentEmailChange,
        resetInput, 
        createNewAccount, 
        loading, 
        CheckIfEmailExists,
        CheckIfUserNameExists,
        handleSignIn, 
        //For RenderGoogleSignUpButton 
        setCurrentEmail,
        setUsername,
        setGoogleID, 
        GoogleID,
    }

    /*
    useEffect(() => {
        if (userList !== null)
            console.log(userList)
    }, [userList])
    */

    return (
        <GuestContext.Provider value={context}>
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                {loading ? <LoadingContainer><Bounce /></LoadingContainer> : null}
                <MainContainer ref={GuestPanelRef} Opacity={loading ? "0.3" : "1.0"}>
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

//The sign up panel has two pages
// useState firstPage object controls which page is being displayed 
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
        CheckIfEmailExists, 
        GoogleID,
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
        if (CheckIfEmailExists(currentEmail)) {
            message = "Email is already in use."
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
                <RenderGoogleSignUpButton moveForward={moveForward} />
                <BorderDiv>
                    <Divider />
                    <BorderText> OR </BorderText>
                    <Divider />
                </BorderDiv>
                <InputWrapper id = "EmailInput"><Input placeholder="EMAIL" value={currentEmail} onChange={handleCurrentEmailChange} /> {validEmail && <BsCheck />}</InputWrapper>
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
        userName,
        password,
        handleUsername,
        handlePassword,
        resetInput, 
        createNewAccount, 
        loading, 
        CheckIfUserNameExists, 
    } = useContext(GuestContext)

    //used for later
    const [isUserValid, setUserValid] = useState(false);
    const [isPassValid, setPassValid] = useState(false); 

    const [displayNameError, setNameError] = useState(false);
    const [displayPassError, setPassError] = useState(false); 
    const [usernameErrorMessage, setUserErrMess] = useState('');
    const [passwordErrorMessage, setPassErrMess] = useState('')

    const ResetError = () => {
        setNameError(false);
        setPassError(false); 
    }

    const handleSubmit = () => {
        setUserErrMess('');
        setPassErrMess('')
        var userValid = true; 
        var passwordValid = true;
        var usernameMessage = '';
        var passwordMessage = ''; 
        if (userName === '') {
            userValid = false; 
            usernameMessage = "Please, provide your username.";
        }
        if (CheckIfUserNameExists(userName)) {
            userValid = false; 
            usernameMessage = "This username is already in use."; 
        }
        if (password.length < 6) {
            passwordValid = false; 
            passwordMessage = "Your password must be 6 characters or more."; 
        }
        if (userValid && passwordValid) {
            createNewAccount(); 
        }
        else {
            setNameError(!userValid);
            setPassError(!passwordValid);
            setUserErrMess(usernameMessage);
            setPassErrMess(passwordMessage); 
        }
    }

    useEffect(() => {
        if (displayNameError)
            setNameError(false)
    }, [userName])

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
                <InputWrapper className="SecondSUPageInput" ><Input placeholder="USERNAME" value={userName} onChange={handleUsername} /></InputWrapper>
                <ErrorMessage display={displayNameError ? DisplayError : RemoveError}>{usernameErrorMessage}</ErrorMessage>
                <InputWrapper className="SecondSUPageInput" id="SecondInputField"><Input placeholder="PASSWORD" value={password} onChange={handlePassword} /></InputWrapper>
                <ErrorMessage display={displayPassError ? DisplayError : RemoveError}>{passwordErrorMessage}</ErrorMessage>
            </Form>
            <Button onClick={handleSubmit}>Sign Up</Button>
            <SwitchMethodWrapper>
                <SwitchMethod onClick={moveBack} id="BackLink"><MdArrowBackIosNew />Back</SwitchMethod>
            </SwitchMethodWrapper>
            </MainContent>
        )
}

const RenderSignIn = props => {
    const {
        openSignUp,
        closeGuestPanel, 
    } = useContext(AppContext)
    const { userName,
        password,
        handleUsername,
        handlePassword,
        resetInput,
        CheckIfUserNameExists,
        handleSignIn, 
    } = useContext(GuestContext); 

    const [displayNameError, setNameError] = useState(false);
    const [displayPassError, setPassError] = useState(false);

    const [usernameErrorMessage, setUserErrMess] = useState('');
    const [passwordErrorMessage, setPassErrMess] = useState(''); 

    const handleSubmit = () => {
        setUserErrMess('');
        setPassErrMess('')
        var userValid = true;
        var passwordValid = true;
        var usernameMessage = '';
        var passwordMessage = '';
        if (userName === '') {
            userValid = false;
            usernameMessage = "Please, provide your username.";
        }
        if (!CheckIfUserNameExists(userName)) {
            userValid = false; 
            usernameMessage = "This username doesn't exists."; 
        }
        if (password.length < 6) {
            passwordValid = false;
            passwordMessage = "Your password must be 6 characters or more.";
        }
        if (userValid && passwordValid) {
            handleSignIn(); 
        }
        else {
            setNameError(!userValid);
            setPassError(!passwordValid);
            setUserErrMess(usernameMessage);
            setPassErrMess(passwordMessage);
        }
    }

    useEffect(() => {
        if (displayNameError)
            setNameError(false)
    }, [userName])

    useEffect(() => {
        if (displayPassError)
            setPassError(false)
    }, [password])

    return (
        <MainContent>
            <TextBlock>
                <h2>Sign In</h2>
                <p>By continuing, you agree to our User Agreement and Privacy Policy.</p>
            </TextBlock>
            <Form>
                <RenderGoogleButton closeGuestPanel={closeGuestPanel}/>
                <BorderDiv>
                    <Divider />
                    <BorderText> OR </BorderText>
                    <Divider />
                </BorderDiv>
                <InputWrapper id="FirstInputField"><Input placeholder="USERNAME" value={userName} onChange={handleUsername} /></InputWrapper>
                <ErrorMessage display={displayNameError ? DisplayError : RemoveError}>{usernameErrorMessage}</ErrorMessage>
                <InputWrapper id="SecondInputField"><Input placeholder="PASSWORD" value={password} onChange={handlePassword} /></InputWrapper>
                <ErrorMessage display={displayPassError ? DisplayError : RemoveError}>{passwordErrorMessage}</ErrorMessage>
                <Button onClick={handleSubmit}>Sign In</Button>
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

const RenderGoogleButton = ({ closeGuestPanel }) => <Button id="ThirdParty" onClick={() => {
    try { SignInWGoogle(); }
    catch (e) { console.log("error with Google Sign In: " + e.message)}
    closeGuestPanel();
}}><FcGoogle /><span>Continue with Google</span></Button>


const RenderGoogleSignUpButton = props => {
    const { moveForward } = props; 
    const {
        setCurrentEmail,
        setUsername,
        setGoogleID,
    } = useContext(GuestContext);

    return (
        <Button id="ThirdParty" onClick={() => {
            SignUpWGoogle(setCurrentEmail, setUsername, setGoogleID, moveForward);
        }}><FcGoogle /><span>Continue with Google</span></Button>
    )
}

const AlertError = errorCode => {
    switch (errorCode) {
        case 'auth/wrong-password':
            alert('Either your username or the password you\'ve entered is wrong.');
            return;
        case "auth / too - many - requests":
            alert("Too many log in attempts. Please, reset your password, or try again later.");
            return; 
        default:
            return; 
    }
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
    font-family: "Verdana";
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: ${props => props.Opacity}
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
background-color: ${props => props.theme.PanelBackgroundColor}; 
`

const InputWrapper = styled.div`
border: ${props => props.theme.GuestInputBorder};
padding: 12px 10px; 
border-radius: 10px;

width: 91%;
display: flex; 
justify-content: space-between; 
background-color: ${props => props.theme.PanelBackgroundColor};
&:focus{
    border: 1px solid #0079d3; 
}
&.SecondSUPageInput{
margin-top: 40px;
}
&#SecondInputField{
margin-top: 40px;
}

`

const SwitchMethodWrapper = styled.div`
    font-size: 12px; 
    text-align: left;
`

const SwitchMethod = styled.span`
    user-select: none; 
    color: #288BD4; 
    text-transform: uppercase; 
    margin-left: 5px; 
    cursor: pointer;  
    &#BackLink{
        font-weight: bold;
   
    }
    &>*{
        margin: auto 10px;
    }
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

const LoadingContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
`