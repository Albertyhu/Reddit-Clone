import styled from 'styled-components'; 

const RenderRIcon = props => {
    const { image, isHeaderIcon, clickEvent, isCommunitySmallLogo } = props; 
    if (isCommunitySmallLogo) {
        return (<Container
            Height="30px"
            Width="30px"
            Border="none"
            FontSize="21px"
            onClick={clickEvent}
            id = "CommunitySmallLogo"
        >r/</Container>)
    }
    if (image !== null && image !== undefined && image !== '') {
        return <ImageIcon
            src={image}
            Height={isHeaderIcon ? "72px" : "20px"}
            Width={isHeaderIcon ? "72px" : "20px"}
            Border={isHeaderIcon ? "5px solid #ffffff" : "none"}
        /> 
    }

    return (
        <Container
            Height={isHeaderIcon ? "72px" : "20px"}
            Width={isHeaderIcon ? "72px" : "20px"}
            Border={isHeaderIcon ? "5px solid #ffffff" : "none"}
            FontSize={isHeaderIcon ? "51px" : "16px"}
        >r/</Container>
        )
}

export default RenderRIcon; 

const Container = styled.div`
    height: ${props => props.Height || "20px"};
    width: ${props => props.Width || "20px"}; 
    border-radius: 9999px; 
    color: #ffffff; 
    font-family: "Verdana"; 
    background-color: ${props => props.customColor || "#008a5a"};
    border: ${props => props.Border || "none"}; 
    text-align: center;
    font-size: ${props => props.FontSize || "16px"}; 
    user-select: none;
    &#CommunitySmallLogo{
        margin: auto;
    }
`

const ImageIcon = styled.img`
    height: ${props => props.Height || "20px"};
    width: ${props => props.Width || "20px"}; 
    border-radius: 9999px; 
    border: ${props => props.Border || "none"}; 
    z-index: 2; 
`