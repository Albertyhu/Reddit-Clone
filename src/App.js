import React, { useState, useRef, useEffect, useCallback} from 'react'; 
import styled, { ThemeProvider } from "styled-components"; 
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
import { doc, updateDoc, getDocs, collection, query } from 'firebase/firestore'; 
import { db } from './firebaseComponent.js';
import { retrieveUserData } from './firebaseMethod/firestoreMethods.js'; 
import CreatePostScreen from './createPost/createPost.js'; 
import RenderPayloadDeliverer from './helperTools/deliverPayload.js'; 

const auth = getAuth(); 

function App() {
    window.onload = function () {
        initFirebaseAuth();
    }
    const initFirebaseAuth = ()=> {
        // Listen to auth state changes.
        onAuthStateChanged(auth, authStateObserver);
    }

    function getUserName() {
        return auth.currentUser;
    }


    //For allowing the user to control whether or not they want the 
    //...page to be displayed with the community theme. 
    //This information will be passed to sidebar.js 
    //The screens displayed comment.js and renderThread.js will have to gather the Community Data which will passed to the side bar
    const [useCommunityTheme, setCommunityTheme] = useState(true);

    async function authStateObserver(user) {
        if (user) { // User is signed in!
            setCurrentUser(getUserName());
            setCurrentUserData(await retrieveUserData(auth.currentUser.uid, setCommunityTheme)); 

        } else { // User is signed out!
            setCurrentUser('')
            setCurrentUserData(null); 
        }
    
    }

    const [currentUser, setCurrentUser] = useState(''); 

    //currentUserData will contain username, email and UID of current logged in user
        /*
        * Data that currentUserData stores:
        email,
        username,
        userID,
        userCommunityTheme,
        Karma,
        */
    const [currentUserData, setCurrentUserData] = useState(null)

    useEffect(() => {
        if (currentUserData !== null && currentUserData !== undefined) {
            console.log("currentUserData: ")
            console.log(currentUserData);
        }
    }, [currentUserData])

    //code for guest panel 
    const [displayGuestPanel, setGuestPanel] = useState(false);

    //if true, the guest panel prompts the user to sign in
    //if false, the guest panel prompts the user to sign up 
    const [displaySignIn, setDisplaySignIn] = useState(false)

    const GuestPanelRef = useRef(); 

    //controls whether background will be blurred or clear 
    const [WindowClarity, setWindowClarity] = useState(true)

    const [normalMode, setNormal] = useState(true)

    const [allCommunities, setCommunities] = useState(null)

    //To be adjusted once Firebase is implemented 
    const [topCommunities, setTopCommunities] = useState(null)

    const retrieveCommunities = async () => {
        const q = query(collection(db, "Communities")); 
        var arr = []; 
        const snapshot = await getDocs(q)
            .catch(error => {console.log(`${error.code}: ${error.message}`)})
        snapshot.forEach(snap => {
            arr.push(snap.data())
        })
        setCommunities(arr) 
    }

    useEffect(() => {
        if (allCommunities !== null && allCommunities !== undefined && allCommunities.length > 0) {
            setTopCommunities(gatherTopCommunity(allCommunities, 5))
        }
    }, [allCommunities])

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

    //Controlls whether the site will be desktop or mobile version 
    const [desktopView, setDesktopView] = useState(window.innerWidth > 540 ? true : false)
   
    const resizeEvent = event => {
        if (window.innerWidth > 540) {
            setDesktopView(true)
        }
        else {
            setDesktopView(false)
        }

    }

    window.addEventListener('resize', resizeEvent);
    useEffect(() => {
        resizeEvent(); 
        return () => {window.removeEventListener('resize', resizeEvent) }
    }, [])

    useEffect(() => {
        console.log("desktopView: " + desktopView); 
    }, [desktopView])

    const context = {
        allCommunities, 
        retrieveCommunities, 
        DefaultTheme, 
        DarkTheme, 
        normalMode,
        setNormal,
        toggleDisplayThemes: () => { setNormal(prev => !prev) },
        userData: sampleUser[0], 
        //returns array of the top 5 communities 
        topCommunities, 

        //for navigation bar 
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
        currentUser,
        setCurrentUser, 
        currentUserData,
        setCurrentUserData,

        //function for adding the community ID after the user joins that community
        addMembership: (ID) => {
            var arr = currentUserData.communityMembership; 
            if (!arr.some(val => val === ID)) {
                arr.push(ID)
                console.log(arr)
                currentUserData.communityMembership = arr; 
            }
        }, 
        removeMembership: (ID) => {
            var arr = currentUserData.communityMembership.filter(val => val !== ID);
            console.log(arr)
            currentUserData.communityMembership = arr;
        }, 

        getUserName, 
        auth, 

        //Allows users to decide whether threads and community screens should be rendered with their corresponding community theme
        useCommunityTheme, 
        toggleCommunityTheme: async () => {
            var boolVal = useCommunityTheme; 
            setCommunityTheme(prev => !prev)
            if (currentUserData !== null && currentUserData !== undefined) {
                const docRef = doc(db, 'users', currentUserData.userID)
                await updateDoc(docRef, {
                    useCommunityTheme: !boolVal,
                })
                    .catch(error => { console.log(`${error.code}: ${error.message}`) })
            }
        }, 
        desktopView, 
    }

    useEffect(() => {
        if (allCommunities === null || allCommunities === undefined) {
            retrieveCommunities(); 
        }
    }, [])

    return (
        <AppContext.Provider value={context}>
            <BrowserRouter>
                {displayGuestPanel && <RenderGuestPanel />}
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainBody Opacity={WindowClarity ? "1.0" : "0.3"}>
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
                        <Route
                            path='/submit'
                            element={<CreatePostScreen  />}
                            />
                        <Route
                            path='/deliverpayload'
                                element={<RenderPayloadDeliverer />}
                        />
                        </Routes>
                    </MainBody>
                </ThemeProvider>
            </BrowserRouter>
               
        </AppContext.Provider>
  );
}

export default App;

const MainBody= styled.div`
    opacity:${props => props.Opacity || "1.0"}; 
    background-color: ${props => props.theme.MainBackgroundColor || "#dae0e6"};
`