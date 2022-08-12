import { useContext } from 'react'; 
import { downArrow, upArrow, upvote, downvote, UpArrowDarkMode, DownArrowDarkMode  } from '../asset/icons'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { ThreadContext, AppContext } from './contextItem.js'; 


//requires passing data through useContext 
//The element that wraps this component needs to have a width of at least 30px in order for 
//... the elements of this component to align 
export const RenderVerticalVoting = props => {
    const { contextType } = props; 
    const {
        upvoted,
        downvoted, 
        upvoteNum,
        downvoteNum, 
        changeUpvoted,
        changeDownvoted,
        changeUpvoteNum,
        changeDownvoteNum,
    } = useContext(contextType); 

    const {
        normalMode, 
        DefaultTheme, 
        DarkTheme, 
    } = useContext(AppContext);

    const upvoteOnclick = () => {
        if (upvoted) {
            changeUpvoted(false)
            changeUpvoteNum(prev => prev - 1)
        }
        else {
            changeUpvoted(true)
            changeUpvoteNum(prev => prev + 1)
            if (downvoted) {
                changeDownvoted(false)
                changeDownvoteNum(prev => prev - 1)
            }
        }
    }

    const downvoteOnclick = () => {
        if (downvoted) {
            changeDownvoted(false)
            changeDownvoteNum(prev => prev - 1)
        }
        else {
            changeDownvoted(true)
            changeDownvoteNum(prev => prev + 1)
            if (upvoted) {
                changeUpvoteNum(prev => prev - 1)
                changeUpvoted(false)
            }
        }
    }
    return (
        <ThemeProvider theme = {normalMode ? DefaultTheme : DarkTheme}>
            <Container>
                {upvoted ?
                    <VoteIcon src={upvote} onClick={upvoteOnclick} />
                    :
                    <VoteIcon src={normalMode ? upArrow : UpArrowDarkMode} onClick={upvoteOnclick} />
                }
                <VoteNumber>{upvoteNum - downvoteNum}</VoteNumber>
                {downvoted ?
                    <VoteIcon src={downvote} onClick={downvoteOnclick} />
                    :
                    <VoteIcon src={normalMode ? downArrow : DownArrowDarkMode} onClick={downvoteOnclick} />
                }
                </Container>
            </ThemeProvider>
        )
}

const Container = styled.div`
    text-align: center; 
`

const VoteIcon = styled.img`
width: 24px; 
height: 24px; 
margin-top: auto;
margin-bottom: auto;
cursor: pointer;
`

const VoteNumber = styled.div`
margin-left: auto;
margin-right: auto;
margin-top: auto;
margin-bottom: auto;
font-weight: bold;
font-size: 12px;
font-family: "Verdana";
color: ${props => props.theme.TextColor}; 
`
