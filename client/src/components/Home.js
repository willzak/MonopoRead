import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Home(props) {
  const [games, setGames] = useState([])
  const [joinableGames, setjoinableGames] = useState([])

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
      <Link to={`/board`}>
        <h2>Play Game:</h2>
        {games.map((game, index) => {
          return <h3 key={index}>{game.name}</h3>
        })}
      </Link> 
      <Link to={`/game/join`}>
        <h2>Join Game:</h2>
        {joinableGames.map((game, index) => {
          return <h3 key={index}>{game.name}</h3>
        })}
      </Link> 
      <Link to={`/game`}>
        <h2>Create Game</h2>
      </Link> 
    </div>
  )
}