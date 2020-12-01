import React from "react";
import { useHistory } from "react-router-dom";
import Board from "./gameBoard";
import SideBar from "./sideBar";

export default function Game(props) {
  const history =  useHistory ()
  if (!props.game) history.push("/")
  if (props.game.ended_at && history.location.pathname !== '/board/result') history.push("/board/result")

  return (
    <section className="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="side-console">
        <SideBar user={props.user} showReview={props.showReview} review={props.review} playerStats={props.playerStats} setPlayerStats={props.setPlayerStats} game={props.game} endBoard={props.endBoard} currentPlayer={props.currentPlayer} rollDice={props.rollDice} chance={props.chance} players={props.players} board={props.board} />
      </div>
      <div className="game-play">
        <Board game={props.game} transport={props.transport} setReview={props.setReview} setShowReview={props.setShowReview} passGo={props.passGo} landTile={props.landTile} drawChance={props.setChanceUsed} saveBook={props.saveBook} currentPlayer={props.currentPlayer} tiles={props.tiles} players={props.players} board={props.board} chance={props.chance} occupied={props.occupied} />
      </div>
    </section>
  )
}
