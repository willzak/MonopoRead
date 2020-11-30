import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Home.js"
import Game from "./game.js"
import Player from "./Player.js"
import GameNameForm from "./GameNameForm.js"
import useApplicationData from '../hooks/useApplicationData'
import Nav from "./Nav.js"

export default function App( props ) {
  const {
    board, players, tiles, chance, user,
    setUser, users,
    currentPlayer, setCurrentPlayer,
    games, setGames,
    endedGames, setEndedGames,
    joinableGames, setJoinableGames,
    game, setGame,
    review, setReview,
    showReview, setShowReview,
    getCurrentBoard, login, logout, endBoard,
    setChanceUsed, rollDice, passGo, landTile, saveBook, transport
  } = useApplicationData();

  return (
    <Router>
      <div>
        <Nav />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home {...props} login={login} logout={logout} games={games} setGames={setGames} endedGames={endedGames} setEndedGames={setEndedGames} joinableGames={joinableGames} setJoinableGames={setJoinableGames}
                game={game} setGame={setGame} user={user} setUser={setUser} users={users} />
              )}
            />
            <Route
              path="/board"
              render={(props) => (
                <Game {...props} game={game} board={board} players={players} tiles={tiles} chance={chance}
                currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
                review={review} setReview={setReview}
                showReview={showReview} setShowReview={setShowReview} endBoard={endBoard}
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