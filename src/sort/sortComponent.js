import styled, {ThemeProvider} from 'styled-components'
import uuid from 'react-uuid'; 
import React, { useContext } from 'react';
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
    return (
        <ThemeProvider theme={ normalMode ? DefaultTheme : DarkTheme}>
            <SortThreadMainContainer>
                <SortItem
                    BackgroundColor={() => CustomBackgroundC("Top")} 
                    TextColor={()=>CustomColor("Top")}
                    onClick={() => setActiveSort("Top")}
                ><GoGraph />Top</SortItem> 
                <SortItem
                    BackgroundColor={() => CustomBackgroundC("Newest")}
                    TextColor={() => CustomColor("Newest")}
                    onClick={() => setActiveSort("Newest")}><TiStarburstOutline />New</SortItem>
                <SortItem
                    BackgroundColor={() => CustomBackgroundC("Oldest")}
                    TextColor={() => CustomColor("Oldest")}
                    onClick={() => setActiveSort("Oldest")}><AiFillFolder />Old</SortItem>
                <SortItem
                    BackgroundColor={() => CustomBackgroundC("Controversial")}
                    TextColor={() => CustomColor("Controversial")}
                    onClick={() => setActiveSort("Controversial")}><FaHeadSideCough />Controversial</SortItem>
                <SortItem
                    BackgroundColor={() => CustomBackgroundC("Hot")}
                    TextColor={() => CustomColor("Hot")}
                    onClick={() => setActiveSort("Hot")}><SiHotjar />Hot</SortItem>
            </SortThreadMainContainer>
        </ThemeProvider>
        )
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