import React, { Component } from "react"
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import Header from "../Header/Header"
import Login from "../Login/Login"
import UserPage from "../UserPage/UserPage"
import Snippet from "../SnippetPage/Snippet"
import NewSnippet from "../SnippetPage/NewSnippet"
import Search from "../Search/Search"

function Home() {
  return (
    <h2>Home page</h2>
  )
}

function Snippets() {
  return (
    <Switch>
      <Route exact path="/snippets" component={props =><h1>Snippets page {console.log(props.match)}</h1>}/>
      <Route exact path="/snippets/new" component={NewSnippet}/>
      <Route path="/snippets/:snippetId" component={Snippet}/>
    </Switch>
  )
}

function NotFound() {
  return (
    <h2>Nothing found :C</h2>
  )
}

class App extends React.Component {
  render() {
    return (
      <>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/search" component={Search}/>
        <Route path="/users/:username" component={UserPage}/>
        <Route path="/snippets" component={Snippets}/>
        <Route component={NotFound}/>
      </Switch>
      </>
    )
  }
}

export default App;