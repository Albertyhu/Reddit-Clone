import styled from 'styled-components'
import uuid from 'react-uuid'; 

//This displays the select element that allows users to choose methods of sorting through comments 
export const RenderCommentSort = props => {
    const {
        optionsArr,
        dispatchFunc,
        selected, 
    } = props;

    const handleChange = e => {
        dispatchFunc(e.target.value)
        console.log(e.target.value)
    }

    return (
        <Container>
            <SortContainer>
                <Text>Sort By:</Text>
                {optionsArr !== null && optionsArr !== undefined && optionsArr.length !== 0 ?
                    <SortSelection onChange={handleChange} value={selected}>
                        {optionsArr.map(opt => <option key={uuid()}>{opt}</option>)}
                    </SortSelection>
                        :
                        null
                        }
             </SortContainer> 
        </Container>
        )
}

 

const Container = styled.div`
    width: 100%; 
    background-color: #fff;
    font-family: Noto Sans,Arial,sans-serif;
    padding-bottom: 20px;
`

const SortContainer = styled.div`
    font-family: "Verdana"; 
    background-color: #ffffff;
    width: 90%;
    margin-left: auto;
    margin-right: auto; 
    border-bottom: 1px solid #e8e8e8;
   
    & > *{
      display: inline-block;
        font-weight: bold;
        font-size: 12px;
        color: #898989;
    }
`
const SortSelection = styled.select`
    border: none;
`

const Text = styled.div`
`