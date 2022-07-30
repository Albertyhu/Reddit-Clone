import styled from 'styled-components'; 

export const MainContainer = styled.div`
display: grid; 
grid-template-columns: 64% 36%; 
grid-column-gap: 24px;
width: 100%; 
background-color: #e6e6e6;
@media screen and (max-width: 540px){
display: block; 

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
`
export const Title = styled.h1`
word-wrap: break-word;
font-family: "Verdana"; 
font-size: 20px;
margin-top: 10px;
margin-bottom: 10px;
line-height: 5px;
`

export const Divider = styled.div`
width: 100%; 
margin-right: auto;
margin-left: auto; 
border-top: 2px solid rgba(0,0,0,0.1); 
margin-top: 10px;
margin-bottom: 10px;
`
