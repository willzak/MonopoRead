import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function Home(props) {
  const history = useHistory()

  useEffect(() => {
    props.setGame(0)
  }, [])

  useEffect(() => {
    if (props.user !== 0) {
      axios.get(`/api/users/${props.user.id}/playable_games`)
      .then((response) => {
        props.setGames(response.data)
        return axios.get(`/api/users/${props.user.id}/joinable_games`)
      })
      .then((response) => {
        props.setJoinableGames(response.data)
        return axios.get(`/api/users/${props.user.id}/ended_games`)
      })
      .then((response) => {
        props.setEndedGames(response.data)
      })
    }
  }, [props.user, props.game]);

  return (
    <div>
      <h1> Home Page </h1>
        <h2>Play Game:</h2>
        {props.games.length === 0 && <h3>You have no playable games.</h3>}
        {props.games.map((game, index) => {
          return <h3 onClick={() => props.playGame(game, history)} key={index}>{game.name}</h3>
        })}
        <h2>View Results:</h2>
        {props.endedGames.length === 0 && <h3>You have finished no games.</h3>}
        {props.endedGames.map((game, index) => {
          return <h3 onClick={() => props.playGame(game, history)} key={index}>{game.name}</h3>
        })}
        <h2>Join Game:</h2>
        {props.joinableGames.length === 0 && <h3>There are no games to join.</h3>}
      <Link to={`/game/join`}>
        {props.joinableGames.map((game, index) => {
          return <h3 onClick={() => props.setGame(game)} key={index}>{game.name}</h3>
        })}
      </Link>
      {props.user ? (
        <Link to={`/game`}>
          <h2>Create Game</h2>
        </Link>
      ) : null}
      <h2>Change User</h2>
      {props.users.map((user, index) => {
        return <h3 style={{width: '100px', border: (props.user.id === user.id) ? '1px solid black' : 'none'}} onClick={() => props.login(user.email, 'password')} key={index}>{user.name}</h3>
      })}
      <button onClick={props.logout}>Logout</button>
    </div>
  )
}