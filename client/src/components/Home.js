import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Home(props) {
  const [games, setGames] = useState([])
  const [joinableGames, setjoinableGames] = useState([])

  useEffect(() => {
    props.setGame(0)
  }, [])

  useEffect(() => {
    if (props.user !== 0) {
      axios.get(`/api/users/${props.user}/games`)
      .then((response) => {
        setGames(response.data)
        return axios.get(`/api/users/${props.user}/joinable_games`)
      })
      .then((response) => {
        setjoinableGames(response.data)
      })
    }
  }, [props.user]);

  return (
    <div>
      <h1> Home Page </h1>
        <h2>Play Game:</h2>
        {games.length === 0 && <h3>You have joined no games.</h3>}
      <Link to={`/board`}>
        {games.map((game, index) => {
          return <h3 onClick={() => props.setGame(game.id)} key={index}>{game.name}</h3>
        })}
      </Link> 
        <h2>Join Game:</h2>
        {joinableGames.length === 0 && <h3>There are no games to join.</h3>}
      <Link to={`/game/join`}>
        {joinableGames.map((game, index) => {
          return <h3 onClick={() => props.setGame(game.id)} key={index}>{game.name}</h3>
        })}
      </Link> 
      <Link to={`/game`}>
        <h2>Create Game</h2>
      </Link> 
    </div>
  )
}