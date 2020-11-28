import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Home.js"
import Game from "./game.js"
import Player from "./Player.js"
import GameNameForm from "./GameNameForm.js"
import useApplicationData from '../hooks/useApplicationData'

export default function App( props ) {
  const {
    board, players, tiles, chance, user,
    setUser, users,
    currentPlayer, setCurrentPlayer,
    game, setGame,
    review, setReview,
    showReview, setShowReview,
    getCurrentBoard,
    setChanceUsed, rollDice, passGo, landTile, saveBook, transport
  } = useApplicationData();

  return (
    <Router>
      <div>
        <h1>Nav</h1>
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home {...props} setGame={setGame} user={user} setUser={setUser} users={users} />
              )}
            />
            <Route
              path="/board"
              render={(props) => (
                <Game {...props} board={board} players={players} tiles={tiles} chance={chance}
                currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
                review={review} setReview={setReview}
                showReview={showReview} setShowReview={setShowReview}
                setChanceUsed={setChanceUsed} rollDice={rollDice} passGo={passGo} landTile={landTile} saveBook={saveBook} transport={transport} />
              )}
            />
            <Route
              path="/game/join"
              render={(props) => (
                <Player {...props} getCurrentBoard={getCurrentBoard} user={user} game={game} setGame={setGame} />
              )}
            />
            <Route
              path="/game"
              render={(props) => (
                <GameNameForm {...props} getCurrentBoard={getCurrentBoard} user={user} setGame={setGame} />
              )}
            />
          </Switch>
      </div>
    </Router>
  )
}