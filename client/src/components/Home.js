import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Home(props) {
  useEffect(() => {
    props.setGame(0)
  }, [])

  useEffect(() => {
    if (props.user !== 0) {
      axios.get(`/api/users/${props.user}/games`)
      .then((response) => {
        props.setGames(response.data)
        return axios.get(`/api/users/${props.user}/joinable_games`)
      })
      .then((response) => {
        props.setJoinableGames(response.data)
      })
    }
  }, [props.user, props.game]);

  return (
    <div>
      <h1> Home Page </h1>
        <h2>Play Game:</h2>
        {props.games.length === 0 && <h3>You have joined no games.</h3>}
      <Link to={`/board`}>
        {props.games.map((game, index) => {
          return <h3 onClick={() => props.setGame(game.id)} key={index}>{game.name}</h3>
        })}
      </Link> 
        <h2>Join Game:</h2>
        {props.joinableGames.length === 0 && <h3>There are no games to join.</h3>}
      <Link to={`/game/join`}>
        {props.joinableGames.map((game, index) => {
          return <h3 onClick={() => props.setGame(game.id)} key={index}>{game.name}</h3>
        })}
      </Link> 
      <Link to={`/game`}>
        <h2>Create Game</h2>
      </Link>
        <h2>Change User</h2>
        {props.users.map((user, index) => {
          return <h3 style={{width: '100px', border: (props.user === user.id) ? '1px solid black' : 'none'}} onClick={() => props.setUser(user.id)} key={index}>{user.name}</h3>
        })}
    </div>
  )
}