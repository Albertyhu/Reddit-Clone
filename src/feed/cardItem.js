import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from '../components/contextItem.js'; 
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import RenderPostFooter from '../thread/postFooter.js'; 

const RenderCardItem = props => {
    const { normalMode,
        DefaultTheme,
        DarkTheme,
    } = useContext(AppContext); 

    const {
        community, 
        communityID, 
        flair, 
        authorName, 
        authorID, 
        textBody, 
        awards, 
        timePosted, 
    } = props; 

    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <RenderPostFooter />
        </ThemeProvider>
        ) 
}

export default RenderCardItem; 