import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from '../components/contextItem.js'; 
import {
    MainContainer,
    PanelContainer,
    SideBar,
    Title,
} from '../global/styledComponents.js'; 
import { SortArray } from '../sort/sortMethods.js'; 
import RenderSideBar from './HomeSideBar.js'; 
import { RenderSortThreadOptions } from '../sort/sortComponent.js'; 
import RenderCardItem from './cardItem.js'; 
import uuid from 'react-uuid';

const SORT_OPTIONS = ["Top", "Newest", "Oldest", "Controversial", "Hot" ];  

const RenderFeed = props => {
    const { data } = props; 
    const [sortMethod, setSort] = useState('Top'); 

    const [sortedData, setSortedData] = useState(SortArray(data, sortMethod)); 
    const { normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext); 

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    useEffect(() => {
        setSortedData(SortArray(data, sortMethod)); 
    }, [sortMethod])
    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainContainer>
                <PanelContainer>
                    <RenderSortThreadOptions
                        activeSort={sortMethod}
                        setActiveSort={setSort}
                    /> 
                    {sortedData.map(thread => <RenderCardItem {...thread} key={uuid()} />)}
                </PanelContainer> 
                <SideBar id= "FeedSideBar">
                    <RenderSideBar />
                    <BackToTopButton
                        Position='sticky'
                        onClick={scrollToTop}
                        id="BackToTopButton"
                    >Back To Top</BackToTopButton>
                </SideBar>

            </MainContainer>

        </ThemeProvider>
        )
}

export default RenderFeed; 


const Wrapper = styled.div`
    position: relative !important;
    height: auto; 
 //   background-color: yellow;  
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
  //  text-transform: unset;
    padding: 10px 30px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
  //  position: ${props => props.Position || "sticky"}; 
    position: sticky;
    bottom: 10px;
    right: 10px;
    background-color: ${props => props.theme.ButtonBackgroundC};
    color: ${props => props.theme.ButtonTextC};
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover};
    }


`
