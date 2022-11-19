import styled from 'styled-components'

export const MainContainer = styled.div`
display: inline-table; 
width: 100%; 
background-color: ${props => props.theme.MainBackgroundColor || "#e6e6e6"};
padding-bottom: 10px;
margin: 0 auto;
@media screen and (min-width: 976px){
    //display: grid; 
    //grid-template-columns: 64% 36%; 
    //grid-column-gap: 24px;
display: flex;
}
`