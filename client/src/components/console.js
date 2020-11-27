import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TileInfo from "./tileInfo.js";
import ChanceInfo from "./chanceInfo";
import CornerInfo from "./cornerInfo";


export default function Console(props) {
  let chanceData = [];

  return (
    <div className="console">
      <Route exact path="/"><img src={window.location.origin + '/MonopoRead.png'} alt="MonopoRead Logo" className="board-logo" /></Route>
        <Route exact path="/tiles/:tileId/submit">
          <TileInfo setReview = {props.setReview} setShowReview = {props.setShowReview} saveBook={props.saveBook} data={props.tiles} submit={true} currentPlayer={props.currentPlayer} players={props.players} board={props.board}  />
        </Route>
       <Route exact path="/tiles/:tileId">
          <TileInfo setReview = {props.setReview} setShowReview = {props.setShowReview} data={props.tiles} submit={false} />
      </Route>
      <Route path="/cards/:cardId">
        <ChanceInfo data={props.chance.card ? props.chance : chanceData} />
      </Route>
      <Route path="/corner/:cornerId">
        <CornerInfo players={props.players}/>
      </Route>

    </div>
  )
}