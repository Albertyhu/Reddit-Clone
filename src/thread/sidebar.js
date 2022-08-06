import React, { useState, useContext, useCallback } from 'react'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { GiCakeSlice } from 'react-icons/gi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BsEye } from 'react-icons/bs';
import { GrMailOption } from 'react-icons/gr'; 
import RenderSwitchButton from '../components/switchButton.js'; 
import uuid from 'react-uuid';
import { AppContext } from '../components/contextItem.js'; 
import { AiOutlineMail } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; 

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

//Side bar component can be used for the thread and community screens 
const RenderSideBar = props => {
    const { contextItem } = props; 
    const {
        useCommunityTheme,
        toggleCommunityTheme, 
        ...community
    } = useContext(contextItem); 

    const { members,
        customNamedMembers,
        onlineMembers,
        dateCreated,
        description,
        communityTitle,
        communityTheme,
        rules,
        moderators,
        communityImage, 
        communityID

    } = community;

    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext);
    /*
    const [useTheme, setUseTheme] = useState(true);

    const toggleTheme = () => {
        setUseTheme(prev => !prev)
    }*/

    const dateObj = new Date(dateCreated)
    const formatedDate = `${MONTH[dateObj.getMonth()]} ${dateObj.getDate() + 1} ${dateObj.getFullYear()}`

    //community options 
    const [openCommunityOptions, setOpenComOpt] = useState(false)
    const toggleCommunityOpt = () => {
        setOpenComOpt(prev => !prev)
    }

    //code for "Back to Top" button 
    /*
    const [showBTTButton, setBTTButton] = useState(false)
    
    var EndOfSidebar = null; 
    const EndOfSidebarRef = useRef(); 
    var EndOfSidebarPosition = 0; 
    useEffect(() => {
        if (EndOfSidebarRef.current) {
            EndOfSidebar = document.getElementById('endOfSidebar')
            EndOfSidebarPosition = EndOfSidebar.getBoundingClientRect().left; 
        } 
    }, [EndOfSidebarRef.current])
    */

  /*
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        EndOfSidebarPosition = EndOfSidebar.getBoundingClientRect();
        if (document.body.scrollTop > EndOfSidebarPosition.bottom ||
            document.documentElement.scrollTop > EndOfSidebarPosition.bottom) {
            setBTTButton(true)
            EndOfSidebar = document.getElementById('endOfSidebar')
        }
        else {
            setBTTButton(false)
            EndOfSidebar = document.getElementById('endOfSidebar')
        }
    }*/

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const navigate = useNavigate();
    const ToCommunity = useCallback(() => navigate('../community', {
        state: {
            communityID: communityID, 
        }
    }), [navigate])

    return (
        <ThemeProvider theme={normalMode ? (useCommunityTheme ? (!!communityTheme ? communityTheme : DefaultTheme) : DefaultTheme) : DarkTheme}>
            <MainContainer id="SideBarMainContainer">
                <Panel id="TopPanel">
                    <PanelHeader>About this community</PanelHeader>
                    <Shell>
                        <LogoContainer onClick={ToCommunity}>
                            {!!communityImage && <CommunityLogo src={communityImage} />}
                            <CommunityTitle>r/{communityTitle}</CommunityTitle>
                        </LogoContainer>
                        <div>{description}</div>
                        <MembersInfoContainer>
                            <MembersInfo>
                                <MembersNumberDiv>{formatTotalNumber(members)}</MembersNumberDiv>
                                <div>{customNamedMembers !== undefined &&
                                    customNamedMembers !== null &&
                                    customNamedMembers.length !== 0
                                    ? customNamedMembers : "Members"}</div>
                            </MembersInfo>
                            <MembersInfo>
                                <MembersNumberDiv>{formatTotalNumber(onlineMembers)}</MembersNumberDiv>
                                <div>Online</div>
                            </MembersInfo>
                        </MembersInfoContainer>
                        <Divider />
                        <DateContainer>
                            <GiCakeSlice />
                            <DateCreated>Created {formatedDate}</DateCreated>
                        </DateContainer>
                        <Button>Join Community</Button>
                        <Divider />
                        <Button
                            className="communityOptionsButton"
                            onClick={toggleCommunityOpt}
                        >Community options
                            {openCommunityOptions ?
                                <IoIosArrowUp />
                                :
                                <IoIosArrowDown />
                            }
                        </Button>
                        {openCommunityOptions &&
                            <CommunityOptionsPanel>
                                <ComOptionsPanelTitle>
                                    <BsEye style={{ marginRight: "10px" }} />
                                Community Theme
                                </ComOptionsPanelTitle>

                            <RenderSwitchButton boolVal={useCommunityTheme} onChangeHandler={toggleCommunityTheme} />
                            </CommunityOptionsPanel>
                        }
                    </Shell>
                </Panel>
                <Panel id="rulesPanel">
                    <PanelHeader>r/{communityTitle} rules</PanelHeader>
                    <Shell>
                        {rules ?
                            rules.map((elem, ind) => <RenderAccordionItem
                                ind={ind}
                                {...elem}
                                key={uuid()} />)
                            :
                            null
                        }
                    </Shell>
                </Panel>
                <Panel id="ModeratorPanel">
                    <PanelHeader>Moderators</PanelHeader>
                    <Shell>
                        <Button id="MessageModButton"><span id ="MailWrapper"><AiOutlineMail style={mailIcon} /></span><span>Message the mods</span></Button>
                        {moderators ?
                            moderators.map(mod => <ModeratorItem key={uuid()} {...mod} />)
                            :
                            null
                        }
                    </Shell>
                    <span id="endOfSidebar"></span>
                </Panel>
                <BackToTopButton
                    Position={'sticky'}
                    onClick={scrollToTop}
                    id="BackToTopButton"
                >Back To Top</BackToTopButton>
            </MainContainer>
        </ThemeProvider>
        ) 
}

export default RenderSideBar;

const RenderAccordionItem = props => {
    const { ind, title, description } = props;
    const [open, setOpen] = useState(false);
    const togglePanel = () => {
        setOpen(prev => !prev)
    }

    return (
        <div>
            <AccordionItem onClick={togglePanel}>
                <span>{ind + 1}. </span>
                <div>{title} </div>
                {open ?
                    <IoIosArrowUp />
                    :
                    <IoIosArrowDown />
                }
            </AccordionItem>
            <AccordionText
                Height={open ? 'fit-content' : '0px'}
                Display={open ? 'block' : 'none'}
                id={`${ind}-AccordionText`}
            >{description}</AccordionText>
        </div>
    )
}

export const formatTotalNumber = (number) => {
    if (number === undefined || number === null)
        return 0;
    var stringNum = number.toString();
    if (stringNum.length < 4) {
        return number;
    }
    //If the number is in the thousands
    else if (stringNum.length >= 4 && stringNum.length < 7) {
        return `${(Math.round(number / 100) / 10).toFixed(1)}k`
    }
    else if (stringNum.length >= 7 && stringNum.length < 10) {
        return `${(Math.round(number / 100000) / 10).toFixed(1)}m`
    }
    else if (stringNum.length >= 10) {
        const exponent = stringNum.length - 1;
        return `${(number / (Math.pow(10, exponent))).toFixed(1)}x10^${exponent}`

    }
}

const ModeratorItem = props => {
    const { userName, userID } = props; 
    return (<ModLink>u/{userName}</ModLink>)
}

const ModLink = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    color: ${props => props.theme.LinkColor};
`

const MainContainer = styled.div`
    font-family: Noto Sans,Arial,sans-serif;
    display: block; 
    border-radius: 5px 5px 0 0;
    height: 100%; 
    position: relative;
`

const Panel = styled.div`
display: grid; 
margin-botom: 20px; 
border-radius: 5px;
& + & {
    margin-top: 20px;
}
background-color: ${props => props.theme.PanelBackgroundColor || "#ffffff"};
color: ${props => props.theme.TextColor  || "#000000"}; 
`

const PanelHeader = styled.div`
    font-size: 15px;
    font-weight: 700;
    letter-spacing: .5px;
    line-height: 12px;
    padding: 12px 12px 12px;
    border-radius: 5px 5px 0px 0px;
    background-color: ${props => props.theme.PanelBackgroundColor|| "#ffffff"};
    color: ${props => props.theme.TextColor || "#000000"}; 
`

const Shell = styled.div`
width: 90%; 
margin-left: auto;
margin-right: auto; 
`

const Button = styled.div`
    width: 100%; 
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: unset;
    padding-top: 10px;
    padding-bottom: 10px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    background-color: ${props => props.theme.ButtonBackgroundC || "#ffffff"}; 
    color: ${props => props.theme.ButtonTextC|| "#000000"}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover || "#d5d5d5"}; 
    }
    &.invertedButton{
        background-color: ${props => props.theme.InvertedButtonBackgroundC || "#ffffff"}; 
        color: ${props => props.theme.InvertedButtonTextC || "#000000"}; 
    }
    &.invertedButton:hover{
        background-color: ${props => props.theme.InvertedButtonBackgroundCHover || "#d5d5d5"}; 
    }
    &.communityOptionsButton{
        border: none; 
        background-color: rgba(0,0,0,0); 
        display: flex; 
        justify-content: space-around;
        color: ${props => props.theme.TextColor};
    }
    &.communityOptionsButton:hover{
        background-color: rgba(0,0,0,0.1);
    }
    &#MessageModButton{
        background-color: rgba(0,0,0,0);
        border: ${props => props.theme.MessageButtonBorder};
        justify-content: center;
        color: ${props => props.theme.LinkColor};
        padding-top: 5px;
        padding-bottom: 5px;
        display: grid; 
        grid-template-columns: 30% 70%;
    }
    &#MessageModButton:hover{
        background-color: rgba(0,0,0,0.1);
     }
    &#MessageModButton > span{
        margin: auto 5px;
        color: ${props => props.theme.MessageButtonColor};
        text-align: left;
    }  
    &#MessageModButton > #MailWrapper{
        text-align: right;
    }
        &#MessageModButton > *{
        margin-top: auto;
        margin-bottom: auto;
    }  
`

const mailIcon = {
    height: "20px",
    width: "20px",
    textAlign: "right",
}


const LogoContainer = styled.div`
display: flex; 
margin-top: 10px;
margin-bottom: 10px;
cursor: pointer;
`

const CommunityTitle = styled.div`
margin-top: auto;
margin-bottom: auto;
margin-left: 10px;
font-weight: bold;
`

const CommunityLogo = styled.img`
width: 50px; 
height: 50px; 
border-radius: 50px; 
`

const MembersInfoContainer = styled.div`
display: grid; 
grid-template-columns: 50% 50%; 
margin-top: 10px;
margin-bottom: 10px;
`

const MembersInfo = styled.div`

`
const MembersNumberDiv = styled.span`
font-size: 16px; 
font-weight: bold; 
line-height: 20px;
`
const Divider = styled.div`
width: 100%; 
margin-right: auto;
margin-left: auto; 
border-top: 2px solid rgba(0,0,0,0.1); 
margin-top: 10px;
margin-bottom: 10px;
`

const DateContainer = styled.div`
display:flex; 
margin-top: 10px;
margin-bottom: 10px;
`

const DateCreated = styled.div``

const CommunityOptionsPanel = styled.div`
    justify-content: space-between; 
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
`

const ComOptionsPanelTitle = styled.div`
    display: flex; 
    margin-top: auto;
    margin-bottom: auto;
`

const AccordionItem = styled.div`
    display: grid;
    grid-template-columns: 10% 85% 5%; 
    justify-content: space-between; 
    padding-top: 10px; 
    paddint-bottom: 10px; 
    border-top: 1px solid rgba(0,0,0,0.1);
    font-weight: bold;
    min-height: 40px;
`

const AccordionText = styled.div`
    margin-left: 10px; 
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    height: ${props => props.Height};  
    display: ${props => props.Display};

`

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden; 
    background-color: yellow;  
`
const BackToTopButton = styled.div`
    width: fit-content; 
    justify-content: center;
    margin: 10px auto;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 10px 30px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    //position: ${props => props.Position || "static"}; 
    position: fixed;
    bottom: 20px; 
    right: 100px;
    background-color: ${props => props.theme.ButtonBackgroundC};
    color: ${props => props.theme.ButtonTextC};
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover};
    }


`
