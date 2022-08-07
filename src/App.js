import React, { useState, useRef } from 'react'; 
import styled from "styled-components"; 
import RenderThread from './thread/renderThread.js'; 
import RenderNavBar from './navBar/navBar.js'; 
import { AppContext } from './components/contextItem.js'; 
//to be changed 
import { sampleUser, threads, SampleCommunity } from './helperTools/dummyData.js'; 
import { gatherTopCommunity } from './components/communityMethods.js'; 
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './screens/home.js'; 
import RenderCommunity from './screens/community.js';
import RenderGuestPanel from './guest/GuestPanel.js'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; 
const auth = getAuth(); 

function getUserName() {
    return auth.currentUser.displayName;
}
function App() {
    
    function initFirebaseAuth() {
        // Listen to auth state changes.
        onAuthStateChanged(auth, authStateObserver);
    }


    function authStateObserver(user) {
        if (user) { // User is signed in!
            setCurrentUser(getUserName())
        } else { // User is signed out!
            setCurrentUser('')
        }
    }


    const [currrentUser, setCurrentUser] = useState(''); 
    const [currentEmail, setCurrentEmail] = useState('')

    const handleCurrentEmailChange = event => {
        setCurrentEmail(event.target.value)
    }

    //code for guest panel 
    const [displayGuestPanel, setGuestPanel] = useState(false);

    //if true, the guest panel prompts the user to sign in
    //if false, the guest panel prompts the user to sign up 
    const [displaySignIn, setDisplaySignIn] = useState(false)

    const GuestPanelRef = useRef(); 

    const [WindowClarity, setWindowClarity] = useState(true)


    const [normalMode, setNormal] = useState(true)

    //To be adjusted once Firebase is implemented 
    const [topCommunities, setTopCommunities] = useState(gatherTopCommunity(SampleCommunity, 5))

    const DefaultTheme = {
        //PanelBackgroundColor applies to the navbar 
        BlackWhite: "#000000",
        PanelBackgroundColor: "#ffffff",
        ContentBodyBackgroundColor: "#ffffff", 
        SearchBarBackgroundColor: "#f6f7f8",
        MainBackgroundColor: "#dae0e6",
        TextColor: "#222222",
        SoftTextColor: "#848787",
        HoverColor: "#cdcdcd", 
        ClickableText: "#755f68",
        ActiveColor: "#0079d3",
        InactiveC: "#828485",
        ButtonBackgroundC: "#0079d3",
        ButtonBackgroundCHover: "#1B90E7", 
        ButtonTextC: "#ffffff",
        InvertedButtonBackgroundC: "rgba(0, 0, 0, 0)", 
        InvertedButtonBackgroundCHover: "rgba(0, 0, 0, 0.1)", 
        InvertedButtonTextC: "#0079d3", 
        InvertedButtonBorder: "1px solid #0079d3",
        BorderColor: "#e8e8e8",
        CardTextLinearGradColor: "linear-gradient(to bottom, rgba(255,255,255, 0) 20%, rgba(255,255,255, 1) 80%)", 
        MessageButtonBorder: "1px solid blue",
        LinkColor: "blue",
        CardBorderHover: "1px solid #898989",
        CommunityHeaderBannerBackgroundC: "#33a8ff",
        ThirdPartyButtonTextC: "#5a5e60", 
        ThirdPartyButtonBorderC: "#dadce0", 
        GuestInputColor: "#a8a7a7", 
        GuestInputBorder: "1px solid rgba(0,0,0,0.2)",
    }
    const DarkTheme = {
        BlackWhite: "#ffffff",
        PanelBackgroundColor: "#1a1a1b",
        ContentBodyBackgroundColor: "#272729", 
        SearchBarBackgroundColor: "#272729",
        MainBackgroundColor: "#030303",
        TextColor: "#d4d7d9",
        SoftTextColor: "#909090",
        HoverColor: "#3C3C3F", 
        ClickableText: "#4fbcff",
        ActiveColor: "#d4d7d9",
        InactiveC: "#818384", 
        ButtonBackgroundC: "#d7dadc",
        ButtonBackgroundCHover: "#D1D1D1", 
        ButtonTextC: "#1a1a1b",
        InvertedButtonBackgroundC: "rgba(255, 255, 255, 0)",
        InvertedButtonBackgroundCHover: "rgba(255, 255, 255, 0.1)",
        InvertedButtonTextC: "#d7dadc",
        InvertedButtonBorder: "1px solid #d7dadc",
        BorderColor: "#343536",
        CardTextLinearGradColor: "linear-gradient(to bottom, rgba(26,26,27, 0) 20%, rgba(26,26,27, 1) 80%)", 
        MessageButtonBorder: "1px solid #ffffff",
        LinkColor: "#ffffff",
        CardBorderHover: "1px solid #ffffff",
        CommunityHeaderBannerBackgroundC: "#272729",
        ThirdPartyButtonTextC: "#A8AEB1", 
        ThirdPartyButtonBorderC: "#dadce0", 
        GuestInputColor: "#a8a7a7", 
        GuestInputBorder: "1px solid rgba(255,255,255,0.5)", 
    }

    const context = {
        DefaultTheme, 
        DarkTheme, 
        normalMode,
        setNormal,
        toggleDisplayThemes: () => { setNormal(prev => !prev) },
        userData: sampleUser[0], 
        //returns array of the top 5 communities 
        topCommunities, 
        openLogIn: () => {
            setGuestPanel(true)
            setWindowClarity(false); 
            setDisplaySignIn(true); 
        },
        openSignUp: () => {
            setGuestPanel(true)
            setWindowClarity(false); 
            setDisplaySignIn(false);
        },
        closeGuestPanel: () => {
            setGuestPanel(false);
            setWindowClarity(true); 
        },

        //Reference for the guest panel 
        GuestPanelRef, 
        displaySignIn, 
        currrentUser,
    }

    return (
        <AppContext.Provider value={context}>
            <BrowserRouter>
                {displayGuestPanel && <RenderGuestPanel />}
                <MainContainer Opacity={WindowClarity ? "1.0" : "0.3"}>
            <RenderNavBar />
            <div id="EmptyDiv" style={{ height: "50px", width: "100%", resize: "none", }}></div>
                <Routes>
                    <Route
                        path="/"
                        element={<Home /> }
                    />
                    <Route
                        path='/community'
                        element={<RenderCommunity />}
                    />
                    <Route
                        path='/thread'
                        element={<RenderThread />}
                    />
                    </Routes>
                </MainContainer>
            </BrowserRouter>
               
        </AppContext.Provider>
  );
}

export default App;

const MainContainer = styled.div`
    opacity:${props => props.Opacity || "1.0"}; 
`