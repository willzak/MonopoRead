import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Board from "./gameBoard";
import SideBar from "./sideBar";

export default function Game(props) {
  return (
    <body class="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <SideBar />
      <div class="game-play">
        <Router>
          <Board />
        </Router>
      </div>
    </body>
  )
}