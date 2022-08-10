import React, { useEffect, useState, useContext } from 'react'; 
import RenderFeed from '../../feed/renderFeed.js';
import { sampleUser, threads, SampleCommunity } from '../../helperTools/dummyData.js'; 
import { useLocation } from 'react-router-dom'; 
import { CommunityContext } from '../../components/contextItem.js'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from '../../components/contextItem.js'; 
import RenderRIcon from '../../asset/icons/r_icon.js';

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
        useCommunityTheme
    } = useContext(AppContext);

    //This gathers all the threads of a selected community 
    //To be changed 
    const gatherCommunityThreads = () => {
        var Arr = threads.filter(val => val.communityID === communityID)
        return Arr;
    }

    const context = {
        ...community, 
        communityID, 
        threadData, 
    }


    //to be changed 
    useEffect(() => {
        if (communityID !== undefined && communityID !== null) {
            setThreadData(gatherCommunityThreads())
            setCommunity(SampleCommunity.find(val => val.communityID === communityID))
        }
    }, [communityID])

    const RenderHeader = props => {
        return (
            <ThemeProvider theme={normalMode? DefaultTheme : DarkTheme}>
                <HeaderContainer id ="HeaderContainer">
                    <HeaderBannerWrapper
                        id="HeaderBannerWrapper"
                        banner={useCommunityTheme ? community.communityTheme.banner ? community.communityTheme.banner : null : null} /> 
                    <HeaderBar id ="HeaderBar">
                        <HeaderBarShell id="HeaderBarShell">
                            <EmptyDiv id ="static"/>
                            <LogoWrapper id="LogoWrapper">
                                <RenderRIcon
                                    image={community.Image}
                                    isHeaderIcon={true}
                                />
                            </LogoWrapper>
                            <HeaderBarGrid>
                                <TitleWrapper><span>{community.communityHeaderTitle}</span><Button>Join</Button></TitleWrapper>
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
                            isCommunity={true} />
                    </>
                    :
                    null;
            default:
                return null;
        }
    }


    /*
    return threadData !== undefined && threadData !== null ?
        <CommunityContext.Provider value={context}>
            <RenderHeader />
            <RenderFeed
                data={threadData}
                isCommunity={true} />
        </CommunityContext.Provider>
        :
        null;
        */
    return (
        <CommunityContext.Provider value={context}>
            <RenderMainBody functionality={functionality} />
        </CommunityContext.Provider>
       )
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
grid-template-columns: 13% 50%; 
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