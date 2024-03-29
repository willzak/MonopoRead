import React from "react";
import { Route } from "react-router-dom";
import TileInfo from "./tileInfo.js";
import ChanceInfo from "./chanceInfo";
import CornerInfo from "./cornerInfo";
import ResultInfo from "./resultInfo";

export default function Console(props) {
  let chanceData = [];

  return (
    <div className="console">
      <Route exact path="/board"><img src={window.location.origin + '/MonopoRead.png'} alt="MonopoRead Logo" className="board-logo" /></Route>
        <Route exact path="/board/tiles/:tileId/submit">
          <TileInfo setReview = {props.setReview} setShowReview = {props.setShowReview} saveBook={props.saveBook} data={props.tiles} submit={true} currentPlayer={props.currentPlayer} players={props.players} board={props.board}  />
        </Route>
       <Route exact path="/board/tiles/:tileId">
          <TileInfo setReview = {props.setReview} setShowReview = {props.setShowReview} data={props.tiles} submit={false} />
      </Route>
      <Route exact path="/board/cards/:cardId">
        <ChanceInfo data={props.chance.card ? props.chance : chanceData} />
      </Route>
      <Route path="/board/corner/:cornerId">
        <CornerInfo game={props.game} transport={props.transport} currentPlayer={props.currentPlayer} players={props.players}/>
      </Route>
      <Route path='/board/result'>
        <ResultInfo currentPlayer={props.currentPlayer} players={props.players} board={props.board} />
      </Route>
    </div>
  )
}