import React, {useContext, useState, useEffect, useCallback} from 'react'
import styled, { ThemeProvider } from 'styled-components'; 
import { RedditLogo, DarkRedditLogo, Silhouette } from '../asset/images';
import { AppContext } from '../components/contextItem.js'; 
import { GiBrightExplosion } from 'react-icons/gi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import RenderSignInComponent from './signInComponent.js'; 
import RenderMenu from './displayMenu.js'; 
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom'; 
import '../global/myStyle.css'; 

const RenderNavBar = props => {
    const {
        DefaultTheme, 
        DarkTheme,
        normalMode, 
        userData, 
        currentUser,
        currentUserData, 
    } = useContext(AppContext); 

    const [openMenu, setOpenMenu] = useState(false)
    const toggleMenu = () => {
        setOpenMenu(prev => !prev); 
    }

    const CloseMenu = () => {
        setOpenMenu(false); 
    }

    //determines whether the default or mobile menu should be rendered
    const [defaultMenu, setMenu] = useState(true); 
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const handleResize = () => {
        if (window.innerWidth <= 540)
            setMenu(false);
        else
            setMenu(true);
    }

    useEffect(() => {
        if (screenWidth <= 540)
            setMenu(false);
        else
            setMenu(true);
    }, [screenWidth])
    window.addEventListener('resize', handleResize)
    useEffect(() => {
        return () => { window.removeEventListener('resize', handleResize)}
    }, [])

    //Needs to be updated when home address in package.json is updated 
    const navigate = useNavigate();
    const ToHome = useCallback(() => navigate('./', {}), [navigate])
    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainContainer defaultMenu={defaultMenu}>
                <Logo
                    src={normalMode && defaultMenu ? RedditLogo : DarkRedditLogo}
                    onClick={ToHome}
                />
                {defaultMenu ?
                    <>{currentUserData !== null && currentUserData !== undefined ?
                        <MenuComponent onClick={toggleMenu}>
                            <MenuShell>
                                <Logo src={Silhouette} id="silhouette" />
                                <MenuDiv>
                                    <UserName>{currentUserData.username ? currentUserData.username : null}</UserName>
                                    <Karma><GiBrightExplosion style={{ color: "orange" }} />{currentUserData.Karma || 0} karma</Karma>
                                </MenuDiv>
                            </MenuShell>
                            <IoIosArrowDown />
                        </MenuComponent>
                        :
                        <RenderSignInComponent toggleMenu={toggleMenu} />
                    }</>
                    :
                    <BurgerMenuWrapper onClick={toggleMenu}>
                        <GiHamburgerMenu />
                    </BurgerMenuWrapper>
                }
            </MainContainer>
            {openMenu &&
                <RenderMenu
                CloseMenu={CloseMenu}
                openMenu={openMenu}
                />
            }
        </ThemeProvider>
    )
}

export default RenderNavBar;

const MainContainer = styled.div`
    width: 100%; 
    height: 50px; 
    position: fixed;    
    background-color: ${props => { return props.defaultMenu ? props.theme.PanelBackgroundColor : "#1d2535" }}; 
    color: ${props => { return props.defaultMenu ? props.theme.TextColor : "#ffffff" }};
    display: flex; 
    justify-content: space-between; 
    font-family: "Verdana"; 
    z-index: 99;
`
const Logo = styled.img`
    height: 60%; 
    width: fit-content; 
    margin: auto 0 auto 20px;
    cursor: pointer;
    &#silhouette{
        height: 25px;
        width: 25px;
        color: ${props => props.theme.SoftTextColor}
    }
`

const LogoWrapper = styled.span`

`

const MenuComponent = styled.div`
    display: flex; 
    margin: auto 20px auto 0;  
    height: inherit;
    justify-content: space-between;
    min-width: 215px;
    cursor: pointer;
    &>*{
       // display: inline-block;
         margin: auto 0; 
    }
`

const MenuShell = styled.div`
    & > * {
    display: inline-block;
}
    
`
const MenuDiv = styled.div`
    margin: auto 0 auto 10px; 
    height: 60%;
`
const UserName = styled.div`
    font-size: 12px;
    font-weight: 400;
`
const Karma = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
    font-size: 10px; 
`

const BurgerMenuWrapper = styled.div`
    margin: auto 20px;
    & > * {
    height: 40px;
    width: 40px;
    cursor: pointer;
}
`

const LinkStyle = {
    margin: "auto 0px",
}