import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import "./Home.css"
import Button from "@material-ui/core/Button"

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
    <div className="home-page">

      <div className="user-info">
        <div>
          <h2>{props.user ? `Hi ${props.user.name}` : 'Not logged in'}</h2>
        </div>
        <div>
          <Button variant= "outlined" style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={props.logout}>Logout</Button>
        </div>
      </div>

      <div className="users">
        {props.users.map((user, index) => {
          return <h3 style={{width: '100px', border: (props.user.id === user.id) ? '1px solid black' : 'none'}} onClick={() => props.login(user.email, 'password')} key={index}>{user.name}</h3>
        })}
      </div>

      <div className="game-options">

        {props.user ? (
          <Link to={`/game`}>
            <div className= "create-game">
              <h2>CREATE</h2>
              <img src="Community_Chest.png" alt="treasure chest" className="community-chest" />
              <h2>GAME</h2>
            </div>
          </Link>
        ) : null}

          <div className="game-card">
            <h2 className="card-header-play">PLAY GAME</h2>
            {props.games.length === 0 && <h3>You have no playable games.</h3>}
            <div className="card-body">
              {props.games.map((game, index) => {
                return <div key={index}><Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.playGame(game, history)} key={index}>{game.name}</Button></div>
              })}
            </div>
          </div>

          <div className="game-card">
            <h2 className="card-header-view">VIEW RESULTS</h2>
              {props.endedGames.length === 0 && <h3>You haven't finished any games.</h3>}
            <div className="card-body">
              {props.endedGames.map((game, index) => {
              return <div key={index}><Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.playGame(game, history)} key={index}>{game.name}</Button></div>
              })}
            </div>
          </div>
            
          <div className="game-card">
            <h2 className="card-header-join">JOIN GAME</h2>
              {props.joinableGames.length === 0 && <h3>There are no games to join.</h3>}
            <div className="card-body">
              <Link to={`/game/join`}>
                {props.joinableGames.map((game, index) => {
                return <div key={index}><Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.setGame(game)} key={index}>{game.name}</Button></div>
                })}
              </Link>
            </div>
          </div>

        </div>
    </div>
  )
}