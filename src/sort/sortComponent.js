import styled, {ThemeProvider} from 'styled-components'
import uuid from 'react-uuid'; 
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/contextItem.js'
//top
import { GoGraph } from 'react-icons/go';
//old, rising, the best
import { AiFillFolder, AiOutlineRise, AiFillRocket } from 'react-icons/ai';
//new
import { TiStarburstOutline } from 'react-icons/ti';
//hot 
import { SiHotjar } from 'react-icons/si';
//controversial
import { FaHeadSideCough } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const SORT_OPTIONS = ["Top", "New", "Old", "Controversial", "Hot"]

//This component is for the thread page
//This displays the select element that allows users to choose methods of sorting through comments 
export const RenderCommentSort = props => {
    const {
        optionsArr,
        dispatchFunc,
        selected, 
    } = props;

    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext);

    const handleChange = e => {
        dispatchFunc(e.target.value)
        //console.log(e.target.value)
    }

    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <Container>
                <SortContainer>
                    <Text>Sort By:</Text>
                    {optionsArr !== null && optionsArr !== undefined && optionsArr.length !== 0 ?
                        <SortSelection onChange={handleChange} value={selected}>
                            {optionsArr.map(opt => <option key={uuid()}>{opt}</option>)}
                        </SortSelection>
                            :
                            null
                     }
                 </SortContainer> 
                </Container>
        </ThemeProvider>
        )
}

export const RenderSortThreadOptions = props => {
    const {
        normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext)

    const {
        //activeSort is the current sorting method used to sort the feed 
        activeSort,
        setActiveSort,
        //activeRendering is the way in which the feed is represented 
        //The options to render the feed are card, classic or compact just like in the real reddit 
        activeRendering,
        setActiveRendering,
    } = props;

    const CustomBackgroundC = (sortMethod) => activeSort === sortMethod ? "rgba(0,0,0,0.05)" : "none";
    const CustomColor = (sortMethod) => activeSort === sortMethod ? normalMode ? "#0079d3" : "#ffffff" : "#878a8c";

    const SortButton = ({ SortMethod }) => {
        return (
            <SortItem
                BackgroundColor={() => CustomBackgroundC(SortMethod)}
                TextColor={() => CustomColor(SortMethod)}
                onClick={() => setActiveSort(SortMethod)}><RenderIcon SortMethod={SortMethod} />{SortMethod}</SortItem>
            )
    }

    const [openMobileMenu, setOpenMobileMenu] = useState(false); 
    const [desktopView, setDesktopView] = useState(window.innerWidth > 540)

    const toggleMobileMenu = () => {
        setOpenMobileMenu(prev => !prev)
    }

    const resizeEvent = () => {
        if (window.innerWidth > 540) {
            setDesktopView(true)
            setOpenMobileMenu(false)
        }
        else {
            setDesktopView(false)
        }
    }

    document.addEventListener("resize", resizeEvent);

    useEffect(() => {
        return () => document.removeEventListener("resize", resizeEvent);
    }, [])

    /*
    useEffect(() => {
        if (window.innerWidth > 540) {
            setDesktopView(true)
            setOpenMobileMenu(false)
        }
        else {
            setDesktopView(false)
        }
    }, [window.innerWidth])
    */


    const MobileSort = () => {
        return (
            <SortItem
                BackgroundColor={normalMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"}
                TextColor={normalMode ? "#0079d3" : "#ffffff"}
                onClick={toggleMobileMenu}><RenderIcon SortMethod={activeSort} />{activeSort} <IoIosArrowDown /></SortItem>
        )
    }

    const MobileSortMenu = () => {
        return (
            <MobileMenu onClick={()=>setOpenMobileMenu(false)}>
                { SORT_OPTIONS.map(opt => <SortButton SortMethod={opt} key={uuid()} />) }
            </MobileMenu>
            )
    }

    return (
        <ThemeProvider theme={ normalMode ? DefaultTheme : DarkTheme}>
            <SortThreadMainContainer>

                {desktopView ? 
                    SORT_OPTIONS.map(opt => <SortButton SortMethod={opt} key={uuid()} />)
                    :
                    <MobileSort />
                }
            </SortThreadMainContainer>
            {openMobileMenu ? <MobileSortMenu /> : null}
        </ThemeProvider>
        )
}


const RenderIcon = ({ SortMethod }) => {
    switch (SortMethod) {
        case "Top": {
            return <GoGraph />;
        }
        case "Controversial": {
            return <FaHeadSideCough />;
        }
        case "New": {
            return <TiStarburstOutline />;
        }
        case "Old": {
            return < AiFillFolder />;
        }
        case "Hot": {
            return <SiHotjar />;
        }
    }
}

//Main Container for thread feed 
const SortThreadMainContainer = styled.div`
    width: 100%;
    background-color: ${props => props.theme.PanelBackgroundColor || "#ffffff"};
    font-family: Noto Sans,Arial,sans-serif;
    display: flex; 
    height: 60px;
    resize: none;
    color: ${props => props.theme.TextColor || "#222222"};
    border-radius: 4px;
    @media screen and (max-width: 540px){
        resize: inherit;
}
`

const SortItem = styled.div`
display: flex; 
border-radius: 50px; 
border: none; 
background-color: ${props => props.BackgroundColor};
color: ${props => props.TextColor};
margin: auto 10px;
padding: 5px 20px; 
cursor: pointer;
user-select: none;
&:hover{
background-color:rgba(0,0,0,0.1);
}
& > *{
    user-select:none; 
}
`


const Container = styled.div`
    width: 100%; 
    background-color: ${props => props.theme.ContentBodyBackgroundColor || "#ffffff"};
    font-family: Noto Sans,Arial,sans-serif;
    padding-bottom: 20px;
    color: ${props => props.theme.TextColor || "#222222"}
`

const SortContainer = styled.div`
    font-family: "Verdana"; 
    background-color: ${props => props.theme.ContentBodyBackgroundColor};
    width: 90%;
    margin-left: auto;
    margin-right: auto; 
    padding-bottom: 10px;
    border-bottom: 2px solid ${props => props.theme.BorderColor};
   
    & > *{
      display: inline-block;
        font-weight: bold;
        font-size: 12px;
        color: #898989;
    }
`
const SortSelection = styled.select`
    border: none;
    background-color: ${props => props.theme.ContentBodyBackgroundColor};
    color: ${props => props.theme.ClickableText};
    & > *{
        color: ${props => props.theme.TextColor};
        margin: 10px 5px;
    }
`

const Text = styled.div`
    color: ${props => props.theme.ClickableText};

`
const MobileMenu = styled.div`
    margin: 5px 0;
    padding: 5px 0; 
    position: abolute; 
    display: grid; 
    border-radius: 5px; 
    background-color: ${props => props.theme.SearchBarBackgroundColor};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-family: "Verdana";
`

