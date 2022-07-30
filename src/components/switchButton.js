import styled from 'styled-components'
const RenderSwitchButton = props => {
    const {boolVal = true, onChangeHandler } = props; 
    return (
        <Switch id = "SwitchElement">
            <Input
                type="checkbox"
                checked={boolVal}
                onChange={onChangeHandler}
                id="inputElement"
            /> 
            <Slider id = "slider"></Slider>
        </Switch>
        )
}

export default RenderSwitchButton;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 51px;
    height: 24px;

& > input{
    opacity: 0; 
    width: 0; 
    height: 0; 
}


`

//&::before creates and inserts a new element
//&::after can be used to accomplish the same function
//Whenever you're placing pseudoelements, always write down content 
//...and its position.
const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;

&::before{
    position: absolute;
    content: "";
    height: 19px;
    width: 19px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
}
`
//#slider:before selects the dot 
const Input = styled.input`
    &:focused + #slider{
        box-shadow: 0 0 1px #2196F3;
}
    &:checked + #slider{
      background-color: #2196F3;
}
    &:checked + #slider:before{
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);

    }
`