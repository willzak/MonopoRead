import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home.js";
import Game from "./game.js";
import Login from "./Login.js";
import Player from "./Player.js";
import GameNameForm from "./GameNameForm.js";
import useApplicationData from '../hooks/useApplicationData';
import Nav from "./Nav.js";

export default function App( props ) {
  const {
    board, players, tiles, chance, user,
    setUser, users,
    currentPlayer,
    playerStats, setPlayerStats,
    games, setGames,
    endedGames, setEndedGames,
    joinableGames, setJoinableGames,
    game, setGame,
    review, setReview,
    showReview, setShowReview,
    currentOccupied,
    createGame, joinGame, playGame,
    login, logout, endBoard,
    setChanceUsed, rollDice, passGo, landTile, saveBook, transport
  } = useApplicationData();

  return (
    <Router>
      <div>
        <Nav game={game} user={user} login={login} logout={logout} />
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home {...props} login={login} games={games} setGames={setGames} endedGames={endedGames} setEndedGames={setEndedGames} joinableGames={joinableGames} setJoinableGames={setJoinableGames}
                playGame={playGame} game={game} setGame={setGame} user={user} setUser={setUser} users={users} />
              )}
            />
            <Route
              exact path="/login"
              render={(props) => (
                <Login {...props} login={login} user={user} setUser={setUser} users={users} />
              )}
            />
            <Route
              path="/board"
              render={(props) => (
                <Game {...props} game={game} board={board} players={players} tiles={tiles} chance={chance}
                currentPlayer={currentPlayer} playerStats={playerStats} setPlayerStats={setPlayerStats}
                review={review} setReview={setReview} user={user} occupied={currentOccupied}
                showReview={showReview} setShowReview={setShowReview} endBoard={endBoard} 
                setChanceUsed={setChanceUsed} rollDice={rollDice} passGo={passGo} landTile={landTile} saveBook={saveBook} transport={transport} />
              )}
            />
            <Route
              path="/game/join"
              render={(props) => (
                <Player {...props} joinGame={joinGame} user={user} game={game} setGame={setGame} />
              )}
            />
            <Route
              path="/game"
              render={(props) => (
                <GameNameForm {...props} createGame={createGame} user={user} setGame={setGame} />
              )}
            />
          </Switch>
      </div>
    </Router>
  )
}