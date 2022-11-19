import styled from 'styled-components'

export const MainContainer = styled.div`
    display: grid; 
    grid-template-columns: 8% 92%; 
    background-color: ${props => props.theme.PanelBackgroundColor}; 
    color: ${props => props.theme.TextColor}; 
    margin: 10px auto;
    font-family: "Verdana";
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.0); 
    overflow-y: hidden;

    &:hover{
        border: ${props => props.theme.CardBorderHover};
}
`

export const VotingColumn = styled.div`
    background-color: ${props => props.theme.SearchBarBackgroundColor};
    padding: 10px 0px;
`

export const MainColumn = styled.div`
    margin: 0 20px;
    cursor: pointer;
@media screen and (max-width: 540px){
    margin: 0px;

}
    & > * {
        @media screen and (max-width: 540px){
            margin-left: 0px;

        }
    }
`

export const Button = styled.div`
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: Noto Sans,Arial,sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: unset;
    line-height: 17px;
    text-transform: unset;
    padding: 5px 6px;
    min-width: 10px;
    witdh: fit-content;
    align-items: center; 
    border-radius: 99999px; 
    text-align: center; 
    cursor: pointer;
    margin-right: 5px;
    background-color: ${props => props.theme.ButtonBackgroundC}; 
    color: ${props => props.theme.ButtonTextC}; 
    &:hover{
        background-color: ${props => props.theme.ButtonBackgroundCHover}; 
    }
    @media screen and (max-width: 540px){
        min-width: 40px;
    }
`

export const CommunityTitleWrapper = styled.div`
margin-top: 10px; 
display: grid;
grid-template-columns: 80% 20%;
@media screen and (min-width: 500px){
grid-template-columns: 85% 15%;
}
`
export const ComunityTitleSecondaryWrapper = styled.div`
    display: flex;
    text-align: center;
    font-size: 8px;
    margin: auto 0;
    & > *{
    margin: auto 2px;
}
@media screen and (min-width: 540px){
    display: grid; 
    grid-template-columns: 10% 30% 10% 25% 25%;
    & > *{
    font-size: 12px;
    }
}
@media screen and (min-width: 800px){
    & > *{
    font-size: 12px;
    }
}
`

export const CommunityTitle = styled.div`
    font-size: 12px;
    font-weight: bold; 
    color: ${props => props.theme.TextColor || "#000000"}; 
`

export const Author = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`

export const TimePosted = styled.div`
    color: ${props => props.theme.SoftTextColor}; 
`

export const ThreadTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin: 10px 0px;
    color: ${props => props.theme.TextColor || "#000000"};
`


//This is responsible for creating the fading effect seen on each card 
export const BodyText = styled.div`
    position: relative; 
    max-height: 350px; 
    overflow-y: hidden;
    min-height: 200px;
    &:after{
              z-index: 0;
              position: absolute;
              bottom: 0;  
              height: 100%;
              width: 100%;
              content: "";
              background: ${props => props.theme.CardTextLinearGradColor}; 
    }
`