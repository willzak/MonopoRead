import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TileInfo from "./tileInfo.js"

export default function Console(props) {
  return (
    <div className="console">
      <Route exact path="/"></Route>
        <Route exact path="/tiles/:tileId/submit">
          <TileInfo saveBook={props.saveBook} data={props.tiles} submit={true} currentPlayer={props.currentPlayer} players={props.players} board={props.board}  />
        </Route>
       <Route exact path="/tiles/:tileId">
          <TileInfo data={props.tiles} submit={false} />
        </Route>

    </div>
  )
}