import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Board from "./gameBoard";
import SideBar from "./sideBar";

export default function Game(props) {
  return (
    <body className="game-view">
      <meta nameName="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="side-console">
        <div className='title' >MONOPOREAD</div>
        <SideBar />
      </div>
      <div class="game-play">
        <Router>
          <Board />
        </Router>
      </div>
    </body>
  )
}