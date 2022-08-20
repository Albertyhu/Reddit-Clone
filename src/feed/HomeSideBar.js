import React, {  useContext, useCallback, useState, useEffect} from 'react'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from '../components/contextItem.js'; 
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import uuid from 'react-uuid';
import BackgroundBanner from '../asset/images/banner-background.png'; 
import { useNavigate } from 'react-router-dom';
import RenderRIcon from '../asset/icons/r_icon.js'; 
import { JoinCommunity } from '../components/membershipButton.js' 

const RenderSideBar = props => {
    const navigate = useNavigate(); 
    const {
        topCommunities,
        normalMode,
        DefaultTheme,
        DarkTheme,
        addMembership,
        currentUserData,
    } = useContext(AppContext);
    const ToCommunity = useCallback((ID) =>navigate('../community', {
        state: {
            communityID: ID,
        },
    
    }), [navigate])

    const RenderCommunityItem = ({
        index,
        communityImage,
        communityTitle,
        communityID }, props) => {

        const [isMember, setIsMember] = useState(currentUserData !== null && currentUserData !== undefined ? currentUserData.communityMembership.some(val => val === communityID) : null)

        useEffect(() => {
            if (currentUserData !== null && currentUserData !== undefined) {
                setIsMember(currentUserData.communityMembership.some(val => val === communityID))
            }
        }, [currentUserData])
        return (
            <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
                <CommunityItem >
                    <Text onClick={() => ToCommunity(communityID)}>{index}</Text>
                    <Text onClick={() => ToCommunity(communityID)}><IoIosArrowUp /></Text>
                    {communityImage ?
                        <CommunityLogo
                            src={communityImage}
                            onClick={() => ToCommunity(communityID)}
                         />
                        : 
                        <RenderRIcon
                            isCommunitySmallLogo={true}
                            clickEvent={() => ToCommunity(communityID)}

                        />
                        }
                    <Text
                        onClick={() => ToCommunity(communityID)}
                    >r/{communityTitle}</Text>
                    {!isMember &&
                        <Button
                        onClick={() => {
                            if (currentUserData !== null && currentUserData !== undefined) {
                                JoinCommunity(currentUserData.userID,
                                    communityID,
                                    setIsMember,
                                    addMembership
                                    )
                                }
                            else {
                                alert("You must be signed in to do that.")
                            }
                        }}
                    >Join</Button>
                    }
               </CommunityItem>
            </ThemeProvider>
            )
    }
    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainContainer id = "SideBarMainContainer">
                <Panel id = "TopPanel">
                    <PanelHeader><span>Today's Top Growing Communities</span></PanelHeader>
                    <Shell>
                        {topCommunities ? 
                            topCommunities.map((item, ind) => <RenderCommunityItem
                                communityTitle={item.communityTitle}
                                communityImage={item.communityImage}
                                communityID={item.communityID}
                                key={uuid()}
                                index={ind + 1}
                            />)
                            :
                            null
                            }
                    </Shell>
                </Panel>
            </MainContainer>

        </ThemeProvider>
        ) 
}

export default RenderSideBar;

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

const MainContainer = styled.div`
    font-family: "Verdana";
    display: block; 
    border-radius: 5px;
    height: inherit;
    background-color: ${props => props.theme.PanelBackgroundColor || "#ffffff"}; 
    color: ${props => props.theme.TextColor};

`

const Panel = styled.div`
display: grid; 
margin-botom: 20px; 
border-radius: 5px;
& + & {
    margin-top: 20px;
}
`

const PanelHeader = styled.div`
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .5px;
    line-height: 12px;
    padding: 12px 12px 12px;
    border-radius: 5px 5px 0px 0px;
    background-image:  linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1.0)), url(${ BackgroundBanner }); 
    background-repeat: no-repeat;
    background-size: cover; 
    background-position: center;
    min-height: 60px;
    position: relative;
    background-color: ${props => props.theme.PanelBackgroundColor || "#ffffff"};
    color: #ffffff; 
    & > span {
       position: absolute;
       bottom: 10px;
    }
`

const Shell = styled.div`
width: 90%; 
margin-left: auto;
margin-right: auto; 
`

const Button = styled.div`
    width: 100%; 
    justify-content: center;
    margin: auto;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 5px 10px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.theme.ButtonBackgroundC || "#ffffff"}; 
    color: ${props => props.theme.ButtonTextC|| "#000000"}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundHoverColor || "#d5d5d5"}; 
    }
    &.invertedButton{
        background-color: ${props => props.theme.InvertedButtonBackgroundColor || "#ffffff"}; 
        color: ${props => props.theme.InvertedButtonTextColor || "#000000"}; 
    }
    &.invertedButton:hover{
        background-color: ${props => props.theme.InvertedButtonBackgroundHoverColor || "#d5d5d5"}; 
    }
    &.communityOptionsButton{
        border: none; 
        background-color: rgba(0,0,0,0); 
        display: flex; 
        justify-content: space-around;
        color: #000000;
    }
    &.communityOptionsButton:hover{
        background-color: rgba(0,0,0,0.1);
    }
    &#MessageModButton{
        background-color: rgba(0,0,0,0);
        border: 1px solid blue;
        justify-content: center;
        color: blue;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    &#MessageModButton:hover{
        background-color: rgba(0,0,0,0.1);
     }
    &#MessageModButton > *{
        margin-top: auto;
        margin-bottom: auto;
    }
`

const CommunityItem = styled.div`
    margin: 0px 10px; 
    padding: 10px 0px;
    display: grid; 
    grid-template-columns: 5% 10% 15% 45% 25%; 
    cursor: pointer; 
    background-color: ${props => props.theme.PanelBackgroundColor};
    color: ${props => props.theme.TextColor}; 
    border-top: 1px solid ${props => props.theme.BorderColor};
`


const CommunityLogo = styled.img`
width: 30px; 
height: 30px; 
border-radius: 50px; 
margin:auto;
cursor:pointer;
`

const Text = styled.div`
    margin: auto 0 auto 5px;
    cursor:pointer;
`

const Wrapper = styled.div`
    position: relative;
    height: inherit; 
    background-color: yellow;  
`
