import React from "react";
import Board from "./gameBoard";
import SideBar from "./sideBar";

export default function Game(props) {

  return (
    <section className="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="game-play">
        <Board transport={props.transport} setReview={props.setReview} setShowReview={props.setShowReview} passGo={props.passGo} landTile={props.landTile} drawChance={props.setChanceUsed} saveBook={props.saveBook} currentPlayer={props.currentPlayer} tiles={props.tiles} players={props.players} board={props.board} chance={props.chance} occupied={props.occupied} />
      </div>
      <div className="side-console">
        <SideBar currentPlayer={props.currentPlayer} rollDice={props.rollDice} chance={props.chance} players={props.players} board={props.board} />
      </div>
      {props.showReview &&
      <div className="review-popup">
        {props.review}
      </div> }
    </section>
  )
}
