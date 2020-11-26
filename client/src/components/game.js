import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Board from "./gameBoard";
import SideBar from "./sideBar";
import useApplicationData from '../hooks/useApplicationData'

export default function Game(props) {
  const {
    board, players, tiles, chance,
    currentPlayer, setCurrentPlayer,
    drawChance, landTile, saveBook, rollDice, 
  } = useApplicationData();

  return (
    <section className="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="side-console">
        <div className='title' >MONOPOREAD</div>
        <SideBar currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} rollDice={rollDice} chance={chance} players={players} board={board} />
      </div>
      <div className="game-play">
        <Router>
          <Board landTile={landTile} drawChance={drawChance} saveBook={saveBook} currentPlayer={currentPlayer} tiles={tiles} players={players} board={board} chance={chance} />
        </Router>
      </div>
    </section>
  )
}
