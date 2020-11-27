import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Board from "./gameBoard";
import SideBar from "./sideBar";
import useApplicationData from '../hooks/useApplicationData'

export default function Game(props) {
  const {
    board, players, tiles, chance,
    currentPlayer, setCurrentPlayer,
    review, setReview,
    showReview, setShowReview,
    setChanceUsed, rollDice, passGo, landTile, saveBook, transport
  } = useApplicationData();

  return (
    <section className="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="game-play">
          <Board transport={transport} setReview={setReview} setShowReview={setShowReview} passGo={passGo} landTile={landTile} drawChance={setChanceUsed} saveBook={saveBook} currentPlayer={currentPlayer} tiles={tiles} players={players} board={board} chance={chance} />
      </div>
      <div className="side-console">
        <SideBar currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} rollDice={rollDice} chance={chance} players={players} board={board} />
      </div>
      {showReview &&
      <div className="review-popup">
        {review}
      </div> }
    </section>
  )
}
