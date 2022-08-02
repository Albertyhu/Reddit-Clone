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
import RenderSideBar from './sidebar.js'; 
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
                <SideBar>
                </SideBar>
            </MainContainer> 
        </ThemeProvider>
        )
}

export default RenderFeed; 


