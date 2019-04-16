import React, { Component } from "react"

import Code from "./Code"

import './SnippetPage.scss'

const langList = ['javascript', 'java', 'python']

function NewSnippetDesc({handler, currentPl}) {
    return (
        <form className="form form--snippet">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="form__input form__input--snippet" onChange={handler}/>

            <label htmlFor="tags">Tags</label>
            <input type="text" name="tags" className="form__input form__input--snippet" onChange={handler}/>

            <label htmlFor="description">Description</label>
            <textarea type="text" name="description" className="form__input form__input--snippet" onChange={handler}/>
            
            <label htmlFor="lang">Language</label>
            <select name="lang" className="form__input form__input--snippet" value={currentPl} onChange={handler}>
                {langList.map(lang => <option value={lang} key={lang}>{lang}</option>)}
            </select>

            <input type="submit" className="form__submit form__submit--snippet" value="Upload" />
        </form>
    )
}

class Snippet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            tags: '',
            desc: '',
            code: '//Your code',
            lang: 'java'
        }

        this.inputHandler = this.inputHandler.bind(this)
    }

    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="c-snippet">
                <div className="c-snippet__description">
                    <NewSnippetDesc 
                        handler={this.inputHandler} 
                        currentPl={this.state.lang}
                    />
                </div>
                <div className="c-snippet__code">
                    <Code 
                        rawCode={this.state.code} 
                        lang={this.state.lang}
                        editable={true}
                        handler={this.inputHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Snippet