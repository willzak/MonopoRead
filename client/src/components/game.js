import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Board from "./gameBoard";
import SideBar from "./sideBar";

export default function Game(props) {
  const [game, setGame] = useState(0)
  const [board, setBoard] = useState(0)

  useEffect(() => {
    axios.get(`/api/games`)
    .then((response) => {
      setGame(response.data[0].id)
    })
  }, [])

  useEffect(() => {
    if (game !== 0) {
      axios.get(`/api/games/${game}`)
      .then(() => {
        return axios.get(`/api/games/${game}/current_board`)
      })
      .then((response) => {
        if (!response.data) return axios.post(`/api/boards`, {game_id: game})
        return response
      })
      .then((response) => {
        if (!response.data) return
        setBoard(response.data.id);
      })
    }
  }, [game])

  return (
    <body class="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <SideBar board={board} />
      <div class="game-play">
        <Router>
          <Board board={board} />
        </Router>
      </div>
    </body>
  )
}