import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext, CommunityContext } from '../components/contextItem.js'; 
import {
    MainContainer,
    PanelContainer,
    SideBar,
  
} from '../global/styledComponents.js'; 
import { SortArray } from '../sort/sortMethods.js'; 
import RenderHomeSideBar from './HomeSideBar.js'; 
import { RenderSortThreadOptions } from '../sort/sortComponent.js'; 
import RenderCardItem from './cardItem.js'; 
import uuid from 'react-uuid';
import RenderSideBar from '../thread/sidebar.js';  

//If the feed is displayed in the Home page, all data should be gathered at Home.js
//If feed is displayed on the Community Page, all data should be gathered at community.js
const RenderFeed = props => {
    //data is array of threads to be displayed on the feed page
    const { data, isCommunity } = props; 
    const [sortMethod, setSort] = useState('Top'); 

    const [sortedData, setSortedData] = useState(SortArray(data, sortMethod)); 
    const { normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext); 

    useEffect(() => {
        setSortedData(SortArray(data, sortMethod)); 
    }, [sortMethod])
    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainContainer id = "RenderFeed_MainContainer">
                <PanelContainer id = "RenderFeed_PanelContainer">
                    <RenderSortThreadOptions
                        activeSort={sortMethod}
                        setActiveSort={setSort}
                    /> 
                    {sortedData.map(thread => <RenderCardItem {...thread} key={uuid()} />)}
                </PanelContainer> 
                <SideBar id= "FeedSideBar">
                    {isCommunity ?
                        <RenderSideBar contextItem={CommunityContext} />
                        :
                        <RenderHomeSideBar />}
 
                </SideBar>
            </MainContainer>
        </ThemeProvider>
        )
}

export default RenderFeed; 
