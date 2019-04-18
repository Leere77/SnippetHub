import React, { Component } from "react"

import Card from "../Card/Card"
import Code from "./Code"

import './SnippetPage.scss'

class Snippet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        this.setState({
                loaded: true,
            
                title: 'First example',
                tags: ['first', 'second'],
                desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit illum cumque et veritatis culpa dicta incidunt dolor, repellendus reprehenderit officiis ducimus corrupti consectetur, provident nulla exercitationem quia perferendis omnis illo',
                metrics: {
                    views: 1,
                    likes: 2
                },
                code: `if(error.response.status == 401) {
    const refresh_token = localStorage.getItem('refresh_token')

    try {
        const decoded = decode(refresh_token)

        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            store.dispatch({
                type: TOKEN_REFRESH_FAILURE,
                isFetching: false,
                isAuth: false,
                access_token: undefined,
                refresh_token: undefined,
                errMsg: "Refresh token is not valid"
            })
            console.log('invalid ref tok -> /login')
            return Promise.reject(error.response.data.error)
        }
    } catch(e) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        store.dispatch({
            type: TOKEN_REFRESH_FAILURE,
            isFetching: false,
            isAuth: false,
            access_token: undefined,
            refresh_token: undefined,
            errMsg: "Refresh token is not valid"
        })
        return Promise.reject(error.response.data.error)
    }

    store.dispatch({
        type: TOKEN_REFRESH_REQUEST,
        isFetching: true
    })
        `,
                lang: 'javascript'
        })
    }

    render() {
        if(!this.state.loaded) 
            return <h1>Loading</h1>

        return (
            <div className="c-snippet">
                <div className="c-snippet__description">
                    <Card 
                        title={this.state.title}
                        tags={this.state.tags}
                        description={this.state.desc}
                        metrics={this.state.metrics}
                        code={this.state.code}
                        lang={this.state.lang}
                    />
                    
                </div>
                <div className="c-snippet__code">
                    <Code 
                        rawCode={this.state.code} 
                        lang={this.state.lang}
                    />
                </div>
            </div>
        )
    }
}

export default Snippet