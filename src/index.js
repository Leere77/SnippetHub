import React, { Component } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"

import "./css/App.scss";
import App from "./js/components/App/App";

import store from './store'

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </Provider>, document.querySelector("#root"));