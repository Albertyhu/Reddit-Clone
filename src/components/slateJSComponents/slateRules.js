import styled from 'styled-components'; 

// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
    p: 'paragraph',
    blockquote: 'quote',
    pre: 'code',

}

// Add a dictionary of mark tags.
const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline',
    del: 'lineThrough',
    sup: 'super',
    h1: 'heading',
    
}

export const rules = [
    {
        // Switch deserialize to handle more blocks...
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                    },
                    nodes: next(el.childNodes),
                }
            }
        },
        // Switch serialize to handle more blocks...
        serialize(obj, children) {
            if (obj.object == 'block') {
                switch (obj.type) {
                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>
                    case 'quote':
                        return <blockquote>{children}</blockquote>
                    case 'code':
                        return (
                            <pre>
                                <code>{children}</code>
                            </pre>
                        )
                    case 'spoiler': 
                        return (
                            <SpoilerBlock>{children}</SpoilerBlock>
                        )
                    case 'underline':
                        return <u>{children}</u>
                    case 'bold':
                        return <strong>{children}</strong>
                    case 'italic':
                        return <em>{children}</em>
                }
            }
        },
    },
]


const QuoteBlock = styled.div`
border-left: 5px solid #dbdbdb;
line-height: 33px;
margin-left: 10px; 
padding-left: 10px;
`

const SpoilerBlock = styled.span`
background-color: #000000;
color: #000000; 
` 
