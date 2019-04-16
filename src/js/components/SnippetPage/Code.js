import React, { Component } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = (props) => {
    const {rawCode, lang, editable, handler} = props

    if(!editable)
        return <SyntaxHighlighter language={lang} style={docco} showLineNumbers >{rawCode.slice(0,300)}</SyntaxHighlighter>

    return (
        <textarea
            className='c-snippet__code-input'
            spellCheck='false'
            name='code'
            onChange={handler}
            value={rawCode}>
        </textarea>
    )
}

export default Code