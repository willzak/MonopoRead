import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { FixedSizeList as List } from 'react-window';
import "./Home.css"
import Button from "@material-ui/core/Button"

export default function Home(props) {
  const history = useHistory()

  useEffect(() => {
    props.setGame(0)
  }, [])

  useEffect(() => {
    if (props.user !== 0) {
      axios.get(`/api/users/${props.user.id}/game_lists`)
      .then((response) => {
        props.setGames(response.data.playable_games)
        props.setJoinableGames(response.data.joinable_games)
        props.setEndedGames(response.data.ended_games)
      })
    }
  }, [props.user, props.game]);

  const joinedGames = ({ index, style }) => (
    <div style={style} key={index}><Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.playGame(props.games[index], history)} key={index}>{props.games[index].name}</Button></div>
  );

  const endedGames = ({ index, style }) => (
    <div style={style} key={index}><Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.playGame(props.endedGames[index], history)} key={index}>{props.endedGames[index].name}</Button></div>
  );

  const joinableGames = ({ index, style }) => (
    <div style={style} key={index}><Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.setGame(props.joinableGames[index])} key={index}>{props.joinableGames[index].name}</Button></div>
  );

  return (
    <div className="home-page">

      <div className="user-info">
        <div>
          <h1>{props.user ? `Hi ${props.user.name}!` : 'Not logged in'}</h1>
        </div>
      </div>

      <h3>Log in as:</h3>
      <div className="users">
        {props.users.map((user, index) => {
          return <h3 style={{textAlign: 'center', padding: '10px', width: '100px', border: (props.user.id === user.id) ? '1px solid black' : 'none'}} onClick={() => props.login(user.email, 'password')} key={index}>{user.name}</h3>
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
              <List className='no-scrollbars'
                height={280}
                itemCount={props.games.length}
                itemSize={40}
                width={'100%'}
              >
                {joinedGames}
              </List>
            </div>
          </div>

          <div className="game-card">
            <h2 className="card-header-view">VIEW RESULTS</h2>
              {props.endedGames.length === 0 && <h3>You haven't finished any games.</h3>}
            <div className="card-body">
              <List className='no-scrollbars'
                height={280}
                itemCount={props.endedGames.length}
                itemSize={40}
                width={'100%'}
              >
                {endedGames}
              </List>
            </div>
          </div>
            
          <div className="game-card">
            <h2 className="card-header-join">JOIN GAME</h2>
              {props.joinableGames.length === 0 && <h3>There are no games to join.</h3>}
            <div className="card-body">
              <Link to={`/game/join`}>
              <List className='no-scrollbars'
                height={280}
                itemCount={props.joinableGames.length}
                itemSize={40}
                width={'100%'}
              >
                {joinableGames}
              </List>
              </Link>
            </div>
          </div>

        </div>
    </div>
  )
}