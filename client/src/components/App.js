import React, { useState } from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Home from "./Home.js"
import Game from "./game.js"
import Player from "./Player.js"
import Setgame from "./Setgame.js"

export default function App( props ) {
  return (
    <Router>
      <div>
        <h1>Nav</h1>
          <Switch>
            <Route exact path = "/" component={Home} />
            <Route path="/board" component={Game} />
            <Route path = "/game/join" component = {Player} />
            <Route path = "/game" component = {Setgame} />
          </Switch>
      </div>
    </Router>
  )
}