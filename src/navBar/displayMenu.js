import React, { useRef, useContext, useEffect } from 'react' 
import styled, { ThemeProvider } from 'styled-components'; 
import { AppContext } from '../components/contextItem.js'; 
import { Divider } from '../global/styledComponents.js'; 
import { VscSignOut } from 'react-icons/vsc';
import RenderSwitchButton from '../components/switchButton.js'; 
import { GrView } from 'react-icons/gr';
import { FiEye } from 'react-icons/fi';
import { IconContext } from 'react-icons'; 

const RenderMenu = props => {
    const { normalMode, toggleDisplayThemes, DefaultTheme, DarkTheme } = useContext(AppContext)
    const { closeMenu } = props; 
    const MenuRef = useRef() 

    const ClickEvent = event => {
        if (MenuRef.current && !MenuRef.current.contains(event.target)) {
            closeMenu(); 
        }
    }
    document.addEventListener('mousedown', ClickEvent);
    useEffect(() => {
        return () => document.removeEventListener('mousedown', ClickEvent);
    }, [])

    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <IconContext.Provider value={{ color: "#848787"}}>
              <MainContainer ref={MenuRef}>
                    <HeaderDiv>
                        <LeftColumn>
                            <FiEye
                                color="white"
                                style={{ color: normalMode ? "#848787" : "#D6D6D6"}}
                            />
                        </LeftColumn>
                        <span>View Options</span>
                        <EmptyDiv />
                        </HeaderDiv>
                    <MenuItem>
                        <EmptyDiv />
                        <>Dark Mode</>
                        <RenderSwitchButton
                            boolVal={!normalMode}
                            onChangeHandler={toggleDisplayThemes}
                        />
                    </MenuItem>
                </MainContainer>
             </IconContext.Provider>
        </ThemeProvider>
        ) 
}

export default RenderMenu; 

const MainContainer = styled.div`
    overflow-y: scoll; 
    right: 10px; 
    top: 55px; 
    border-radius: 5px;
    position: fixed; 
    min-width: 255px;
    font-family: "Verdana";
    background-color: ${props => props.theme.PanelBackgroundColor};    
    & > * {
        font-size: 15px;
        margin: 10px 10px;
        display: grid;
        grid-template-columns: 20% 60% 20%; 
    }
`

const HeaderDiv = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`
const EmptyDiv = styled.div``

const LeftColumn = styled.div`
    margin: auto;
`

const MenuItem = styled.div`
    color: ${props => props.theme.TextColor}; 
`