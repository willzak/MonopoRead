import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'
import "./Home.css"
import Button from "@material-ui/core/Button"

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
    <div className="home-page">

      <div className="user-menu">
        <h2>Hi User</h2>
        {props.users.map((user, index) => {
          return <h3 style={{width: '100px', border: (props.user === user.id) ? '1px solid black' : 'none'}} onClick={() => props.setUser(user.id)} key={index}>{user.name}</h3>
        })}
      </div>

      <div className="game-options">
      
          <Link to={`/game`}>
            <div className= "create-game">
              <h2>CREATE</h2>
              <img src="Community_Chest.png" alt="treasure chest" className="community-chest" />
              <h2> GAME</h2>
            </div>
          </Link>
      

        <div className= "game-card">
            <h2 className="card-header-play">PLAY GAME</h2>
            {props.games.length === 0 && <h3>You have joined no games.</h3>}
            <div className="card-body-play">
            <Link to={`/board`}>
              {props.games.map((game, index) => {
                return <Button className="button" onClick={() => props.setGame(game.id)} key={index}>{game.name}</Button>
              })}
            </Link> 
            </div>
         </div>
      
        <div className="game-card">
          <h2 className="card-header-join">JOIN GAME</h2>
            {props.joinableGames.length === 0 && <h3>There are no games to join.</h3>}
          <Link to={`/game/join`}>
            {props.joinableGames.map((game, index) => {
              return <h3 onClick={() => props.setGame(game.id)} key={index}>{game.name}</h3>
            })}
          </Link> 
        </div>
      </div>

    </div>
  )
}