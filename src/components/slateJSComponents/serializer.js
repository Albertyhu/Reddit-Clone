import uuid from 'react-uuid'; 
import styled from 'styled-components'; 

/**
 To understand how the function works, you have to understand the format and architecture of the data 
 "Fox jumped over the fence." will look something like this on JSON
 [{"type":"paragraph","children":[{"text":"Fox jumped over the fence"}]},

An order list will look something like this on JSON 
{"type":"orderedList","children":[{"type":"list-item","children":[{"text":"fse"},{"text":"fsegas","super":true},{"text":"egse"}]},]

 */

export const Serialize = props => {
    const { data } = props;
    var mainContent = null; 
    return data.map(item => {
        switch (item["type"]) {
            case "paragraph":
                //      console.log(item["children"].map(val => val));
                mainContent = <div style={GetAlignment(item["align"])} key={uuid()} >{item["children"].map(child => <RenderElement key={uuid()} data={child} />)}</div>;
                return mainContent;
            case "orderedList":
                mainContent = <ol style={GetAlignment(item["align"])} key={uuid()}><RenderListItem data={item["children"]} /></ol>;
                return mainContent; 
            case "bulleted":
                mainContent = <ul style={GetAlignment(item["align"])} key={uuid()} ><RenderListItem data={item["children"]}  /></ul>;
                return mainContent;
        }
        
    })

}

export const RenderListItem = props => {
    const { data } = props; 
    return data.map(item => {
        return <li key={uuid()}>{item["children"].map(child => <RenderElement data={child} key={uuid()} />)}</li>
    })
    //return data["children"].map(child => <li><RenderElement key={uuid()} data={child} /></li>)
}

//Need to add quote block and header
export const RenderElement = props => {
    const { data } = props; 
    var element = <span>{data["text"]}</span>
    for (var key in data) {
        switch (key) {
            case 'bold':
                if(data["bold"])
                     element = <b>{element}</b>;
            case 'italic':
                if (data["italic"])
                element =  <i>{element}</i>;
            case 'code':
                if (data["code"])
                element =  <pre><code>{element}</code></pre>;
            case 'underline':
                if (data["underline"])
                element =  <u>{element}</u>;
            case 'lineThrough':
                if (data["lineThrough"])
                element =  <del>{element}</del>;
            case 'super':
                if (data["super"])
                element =  <sup>{element}</sup>;
            case 'spoiler':
                if (data["spoiler"])
                element = <SpoilerBlock>{element}</SpoilerBlock>;
            case 'header':
                if (data["header"])
                element = <h1>{element}</h1>; 
            case 'quote': 
                if (data["quote"])
                element = <QuoteBlock>{element}</QuoteBlock>
        }
    }
    return element; 
}

export const GetAlignment = ( alignment ) => {
    switch (alignment) {
        case "alignLeft":
            return { textAlign: "left" }; 
        case "alignCenter":
            return { textAlign: "center" };
        case "alignRight":
            return { textAlign: "right" };
        default:
            return { textAlign: "left" }; 
    }
}


export const QuoteBlock = styled.div`
border-left: 5px solid #dbdbdb;
line-height: 33px;
margin-left: 10px; 
padding-left: 10px;
`

export const SpoilerBlock = styled.span`
background-color: #000000;
color: #000000; 
` 
