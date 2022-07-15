import styled from 'styled-components'; 

const RenderRIcon = props => {
    const { image } = props; 
    if (image !== null && image !== undefined && image !== '') {
        return <ImageIcon src={image} /> 
    }

    return (
        <Container>r/</Container>
        )
}

export default RenderRIcon; 

const Container = styled.div`
    height: 20px;
    width: 20px; 
    border-radius: 20px; 
    color: #ffffff; 
    font-family: "Verdana"; 
    background-color: ${props => props.customColor || "#008a5a"};
    text-align: center;
`

const ImageIcon = styled.img`
    height: 20px;
    width: 20px; 
    border-radius: 20px; 
`