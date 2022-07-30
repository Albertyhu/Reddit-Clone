import React, { useRef, useContext } from 'react' 
import styled from 'styled-components'; 
import { AppContext } from '../components/contextItem.js'; 
import { Divider } from '../global/styledComponents.js'; 
import { VscSignOut } from 'react-icons/vsc';

const RenderMenu = props => {
    const { DefaultTheme, DarkTheme} = useContext(AppContext)
}

export default RenderMenu; 

const MainContainer = styled.div`
    overflow-y: scoll; 
    background-color: ${props => props.theme.PanelBackgroundColor};    
    & > * {
        margin: auto 10px;
    }
`

const HeaderDiv = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`

const MenuItem = styled.div`
    color: ${props => props.theme.TextColor}; 
    display: grid;
    grid-template-columns: 10% 80% 10%; 
`