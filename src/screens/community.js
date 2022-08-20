import React, { useEffect, useState, useContext, useCallback } from 'react'; 
import RenderFeed from '../feed/renderFeed.js';
import { sampleUser, threads, SampleCommunity } from '../helperTools/dummyData.js'; 
import { useLocation } from 'react-router-dom'; 
import { CommunityContext } from '../components/contextItem.js'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from '../components/contextItem.js'; 
import RenderRIcon from '../asset/icons/r_icon.js';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseComponent.js';
import { SortArray } from '../sort/sortMethods.js'; 
import { useNavigate } from 'react-router'; 
import { JoinCommunity } from '../components/membershipButton.js' 

const RENDER_THREADS = 'RENDER_ THREADS';

//What this to do is to gather all the threads
const RenderCommunity = () => {
    const location = useLocation();
    const { communityID } = location.state;
    const [community, setCommunity] = useState(null)
    const [threadData, setThreadData] = useState(null)

    //community.js serves two purpose 
    //Either it diplays the feed of the community or displays the screen for users to create a post 
    //With the help of the component RenderMainBody, the useState object functionaliy helps to determine what should be rendered
    const [functionality, setFunctionality] = useState(RENDER_THREADS); 
    
    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
        useCommunityTheme,
        allCommunities,
        retrieveCommunities, 
        addMembership, 
        currentUserData,
    } = useContext(AppContext);

    //retrieves all threads relevant to the target community 
    const retrieveData = useCallback(async () => {
        var arr = []
        const docRef = query(collection(db, "Threads"), where("communityID", "==", communityID))
        const snapshot = await getDocs(docRef)
            .catch(e => { console.log(`${e.code}: ${e.message}`) })
        snapshot.forEach(snap => {
            arr.push(snap.data())
 
        })
        setThreadData(arr)
    }, [communityID])

    //retrives all all data relevant to the target community 
    const retrieveCommunity = useCallback(async () => {
        if (allCommunities === null || allCommunities === undefined || allCommunities.length === 0) {
            const docRef = doc(db, "Communities", communityID)
            const snapshot = await getDoc(docRef)
            setCommunity(snapshot.data());
        }
        else {
            setCommunity(allCommunities.find(val => val.communityID === communityID))
        }
    }, [communityID])

    const navigate = useNavigate();

    const GoCreatePostPage = useCallback(() => {
        navigate('../submit', {
            state: {
                community_ID: communityID,
              //  communityData: community,
            }
        })
    }, [navigate])

    const context = {
        ...community,
        communityID,
        threadData,
        retrieveData, 
        GoCreatePostPage, 
    }

    useEffect(() => {
        if (communityID !== undefined && communityID !== null) {
            retrieveData();

            if(community === null || community === undefined)
                retrieveCommunity();
        }
    }, [])

    const [isMember, setIsMember] = useState(currentUserData !== null && currentUserData !== undefined ? currentUserData.communityMembership.some(val => val === communityID) : null)

    useEffect(() => {
        if (currentUserData !== null && currentUserData !== undefined) {
            setIsMember(currentUserData.communityMembership.some(val => val === communityID))
        }
    }, [currentUserData])

    const RenderHeader = props => {
        return (
            <ThemeProvider theme={normalMode? DefaultTheme : DarkTheme}>
                <HeaderContainer id ="HeaderContainer">
                    <HeaderBannerWrapper
                        id="HeaderBannerWrapper"
                        banner={useCommunityTheme ? community.communityTheme ? community.communityTheme.banner : null : null} /> 
                    <HeaderBar id ="HeaderBar">
                        <HeaderBarShell id="HeaderBarShell">
                            <EmptyDiv id ="static"/>
                            <LogoWrapper id="LogoWrapper">
                                <RenderRIcon
                                    image={community.Image}
                                    isHeaderIcon={true}
                                />
                            </LogoWrapper>
                            <HeaderBarGrid id = "HeaderBarGrid">
                                <TitleWrapper id="TitleWrapper">
                                    <span id="CommunityHeaderTitle">{community.communityHeaderTitle}</span>
                                    {!isMember &&
                                        <Button
                                        onClick={() => {
                                            if (currentUserData !== null && currentUserData !== undefined) {
                                                JoinCommunity(
                                                    currentUserData.userID,
                                                    communityID,
                                                    setIsMember,
                                                    addMembership
                                                )
                                            }
                                            else {
                                                alert("You must be signed in to do that.")
                                            }
                                        }}
                                    >Join</Button>}
                                </TitleWrapper>
                                <BreadCrumb>r/{community.communityTitle}</BreadCrumb>
                            </HeaderBarGrid>
                        </HeaderBarShell>
                        <EmptyDiv />
                    </HeaderBar>
                </HeaderContainer>
            </ThemeProvider>
            )
    }

    const RenderMainBody = ({ functionality }) => {
        const { threadData } = useContext(CommunityContext);
        switch (functionality) {
            case RENDER_THREADS:
                return threadData !== undefined && threadData !== null ?
                    <>
                        <RenderHeader />
                        <RenderFeed
                            data={threadData}
                            isCommunity={true}
                           
                        />
                    </>
                    :
                    <ErrorMessageWrapper></ErrorMessageWrapper>;
            default:
                return null;
        }
    }


    return community ? 
        <CommunityContext.Provider value={context}>
            <RenderMainBody functionality={functionality} />
        </CommunityContext.Provider >
            :
        <ErrorMessageWrapper></ErrorMessageWrapper>    
}

export default RenderCommunity;


const HeaderContainer = styled.div`
display: grid; 
grid-template-rows: 50% 50%; 
width: 100%; 
min-height: 216px; 
position: relative; 
`

const HeaderBannerWrapper = styled.div`
background-color: ${props => props.theme.CommunityHeaderBannerBackgroundC};
background-image: url(${props => props.banner});
background-position: center;
background-repeat: no-repeat; 
background-size: cover; 
width: 100%;

`

//This is the lower portion of the header that contains community title
const HeaderBar = styled.div`
width: inherit; 
bottom: 0px; 
background-color: ${props => props.theme.PanelBackgroundColor}; 
display: grid;
grid-template-columns: 64% 36%; 
@media screen and (max-width: 540px){
display: flex;
}

`
const EmptyDiv = styled.div`
@media screen and (max-width: 540px){
    display: none;
    &#static{
    display: inline; 
}
}
`

const HeaderBarShell = styled.div`
positon: relative;
justify-self: flex-end;
width: 741px;  
resize: none;
height: 100%;
display: grid; 
grid-template-columns: 13% 87%; 
@media screen and (max-width: 540px){
    min-width: 0;
    width: 100%;
    grid-template-columns: 25% 50%; 
}
`

const HeaderBarGrid = styled.div`
display: grid; 
grid-templates-row: 50% 50; 
`

const TitleWrapper = styled.div`
display: flex; 
& > span{
    font-size: 25px; 
    font-family: 'Verdana'; 
    font-weight: bold;
    margin: auto 0;
    width: fit-content;
    color: ${props => props.theme.TextColor};
}
`

const BreadCrumb = styled.div`
    font-family: 'Verdana'; 
    color: #838383; 
    font-size: 12px;
`

const LogoWrapper = styled.div`
position: absolute; 
top: 86px; 
justify-self: flex-start;
&>*{
    display: inline-block;
} 
`

const LogoImage = styled.img`
border: 5px solid #ffffff; 
height: 50px;
width: 50px; 
border-radius: 9999; 
z-index: 2; 
`

const Button = styled.div`
    justify-content: center;
    margin: auto 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 8px 30px;
    min-width: 10px;
    witdh: fit-content;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    background-color: ${props => props.theme.ButtonBackgroundC}; 
    color: ${props => props.theme.ButtonTextC}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover}; 
}
`

const ErrorMessageWrapper = styled.div`
    margin: auto; 
`