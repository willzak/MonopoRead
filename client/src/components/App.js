import React, { useState } from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Home from "./Home.js"
import Game from "./game.js"
import Player from "./Player.js"

export default function App( props ) {
  return (
    <Router>
      <div>
        <h1>Nav</h1>
          <Switch>
            <Route exact path = "/" component={Home} />
            <Route path="/board" component={Game} />
            <Route path = "/player" component = {Player} />
          </Switch>
      </div>
    </Router>
  )
}