import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TileInfo from "./tileInfo.js"

export default function Console(props) {
  return (
    <div className="console">
        <Route exact path="/tiles/:tileId/submit">
          <TileInfo data={props.tiles} submit={true}  />
        </Route>
       <Route exact path="/tiles/:tileId">
          <TileInfo data={props.tiles} submit={false} />
        </Route>

    </div>
  )
}