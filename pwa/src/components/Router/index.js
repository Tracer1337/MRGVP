import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import HomeScreen from "../../screens/HomeScreen"

export default class Router extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
