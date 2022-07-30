import React, { useContext} from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { IoPersonOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { AppContext } from '../components/contextItem.js'; 

const RenderSignInComponent = props => {
    const { DefaultTheme,
        DarkTheme,
        normalMode, 
    } = useContext(AppContext)

    return (
        <ThemeProvider theme={normalMode ? DefaultTheme : DarkTheme}>
            <MainContainer>
                <Button id="inverted">Log In</Button>
                <Button>Sign Up</Button>
                <GuestMenu>
                    <IoPersonOutline />
                    <IoIosArrowDown />
                </GuestMenu>
            </MainContainer>
        </ThemeProvider>
        )

}

export default RenderSignInComponent; 

const MainContainer = styled.div`
    display: flex; 
    margin: auto 20px;
    & > * {
        margin: auto 10px;
        cursor: pointer;
    }
`

const Button = styled.div`
    width: fit-content; 
    justify-content: center;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 5px 40px;
    min-width: 32px;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 

    background-color: ${props => props.theme.ButtonBackgroundC || "#0079d3"}; 
    color: ${props => props.theme.ButtonTextC || "#ffffff"}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover || "rgba(0, 0, 0, 0)"}; 
    }
    &#inverted{
        background-color: ${props => props.theme.InvertedButtonBackgroundC}; 
        color: ${props => props.theme.InvertedButtonTextC}; 
        border: ${props => props.theme.InvertedButtonBorder};
    }
    &#inverted:hover{
        background-color: ${props => props.theme.InvertedButtonBackgroundCHover}; 
    }
`

const GuestMenu = styled.div`
    display:flex; 
   
    & > *{
    margin: auto; 
}
`