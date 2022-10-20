import React, { useContext, useCallback, useState, useEffect } from 'react'; 
import { ThreadContext, AppContext } from '../components/contextItem.js'
import { RenderVerticalVoting } from '../components/votingComponent.js'; 
import styled, { ThemeProvider } from 'styled-components'; 
import {
    Title, 
} from '../global/styledComponents.js'; 
import RenderRIcon from '../asset/icons/r_icon.js'; 
import RenderPostFooter from './postFooter.js'; 
import { useNavigate } from 'react-router-dom'; 
import { rules } from '../components/slateJSComponents/slateRules.js';
import { Serialize } from '../components/slateJSComponents/serializer.js'; 

// Create a new serializer instance with our `rules` from above.

//This functional component renders the main body of the post. 
const RenderMainPost = props => {
    const { ...threadData } = useContext(ThreadContext);
    const {
        normalMode, 
        DefaultTheme,
        DarkTheme, 
    } = useContext(AppContext);

    const navigate = useNavigate(); 
    const ToCommunity = useCallback(() => navigate('../community', {
        state: {
            communityID: threadData.communityID, 
        },
    }), [navigate, threadData.communityID])


    return (
        <ThemeProvider theme={normalMode? DefaultTheme : DarkTheme}>
        <Container>
            <RenderVerticalVoting contextType={ThreadContext} /> 
            <InnerCont>
                <Header>
                    <RenderRIcon /> 
                        <Community onClick={ToCommunity}>r/{threadData.community}</Community>
                    <AuthorInfo> &#x2022; Posted by <span>u/{threadData.authorName}</span></AuthorInfo>
                    <TimePosted>4 hours ago</TimePosted>
                </Header>
                <Title>{threadData.title}</Title>
                    <MainPost>{threadData.textBody && <Serialize data={JSON.parse(threadData.textBody)} />}</MainPost>
                <RenderPostFooter />
            </InnerCont>  
        </Container>
        </ThemeProvider>
        )
} 

export default RenderMainPost; 

const Container = styled.div`
    display: grid; 
    grid-template-columns: 30px auto; 
    font-family: "Verdana"; 
    column-gap: 10px;
    background-color: #ffffff;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    color: ${props => props.theme.TextColor}; 
    background-color: ${props => props.theme.ContentBodyBackgroundColor}; 
`

const InnerCont = styled.div`
    display: grid; 
    grid-template-rows: 23px auto auto 40px; 
`
const Header = styled.div`
    display: flex; 
    & > *{
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        color: #adadad; 
        font-size: 12px;
    }
@media screen and (max-width: 540px){
    & > *{font-size: 10px;}
}
@media screen and (max-width: 360px){
    & > *{font-size: 8px;}
}
`

const Community = styled.div`
    font-weight: bold; 
    cursor: pointer;
    color: ${props => props.theme.TextColor};       
`
const AuthorInfo = styled.div`
    cursor: pointer; 
    & > span:hover{
        text-decoration: underline;
}
`
const TimePosted = styled.div`

`

const MainPost = styled.div`

`

const Gap = styled.div`
background-color: #d3d3d3; 
`