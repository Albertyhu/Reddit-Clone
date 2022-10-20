import styled from 'styled-components'; 

//This component is mainly for pages with two columns such as the thread page and the home page
export const MainContainer = styled.div`
display: grid; 
grid-template-columns: 64% 36%; 
grid-column-gap: 24px;
width: 100%; 
background-color: ${props => props.theme.MainBackgroundColor || "#e6e6e6"};
padding-bottom: 10px;
@media screen and (max-width: 540px){
    display: inline-table; 
    grid-template-columns: 100%; 
}
`
//justify-self with the value flex-end placed the element to the right against the wall of the grid area  
export const PanelContainer = styled.div`
    width: 640px; 
    justify-self: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
@media screen and (min-width: 960px){
    width: 740px; 
}
@media screen and (max-width: 540px){
    width: 100%;  
}
`

export const SideBar = styled.div`
width: 312px; 
margin-top: 20px;
@media screen and (max-width: 540px){
    display: none; 
}
&#FeedSideBar{
    position: relative;
}
`
export const Title = styled.h1`
word-wrap: break-word;
font-family: "Verdana"; 
font-size: 20px;
margin-top: 10px;
margin-bottom: 10px;
line-height: 5px;
@media screen and (max-width: 540px){
    line-height: 20px;
}
`

export const Divider = styled.div`
width: 100%; 
margin-right: auto;
margin-left: auto; 
border-top: 2px solid rgba(0,0,0,0.1); 
margin-top: 10px;
margin-bottom: 10px;
`

export const ErrorMessage = styled.div`
    text-align: left;
    font-size: ${props => props.FontSize || "12px"}; 
    color: red; 
    ${props => props.display};
    margin: ${props => props.Margin || "5px 0" };
    transition: transform 0.5s ease-in, opacity 0.5s ease-in; 
    transition-delay: 0.1s;
    z-index: 0;
    user-select: none;
    position: absolute;
`

/*Used as a complement to ErrorMessage component */
export const DisplayError = "transform: translateY(0px); opacity: 1.0;"
export const RemoveError = "transform: translateY(-10px); opacity: 0;"