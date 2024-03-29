import React, {useState, useEffect} from "react";
import axios from 'axios';

import Roll from "./dice";
import './sideBar.css';

export default function SideBar(props) {
  const [disabled, setDisabled] = useState(false)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    if (props.board !== 0) {
      axios.get(`/api/boards/${props.board}/player_stats`)
      .then((response) => {
        let winner = false;
        const newPlayerStats = response.data.map(player => {
          if (props.game.win_requirement === 'Points' && player.points >= props.game.win_points) {
            winner = player.player.id;
          }
          return {
            player: player,
            id: player.player.id,
            color: player.color.hexcode,
            name: player.user.name,
            books: player.books,
            points: player.points,
            last_play: player.player.updated_at
          }
        })
        props.setPlayerStats(newPlayerStats);
        if (winner) {
          setDisabled(true)
          setEnded({winner, newPlayerStats});
        }
      })
    }
  }, [props.board, props.players])

  useEffect(() => {
    if (ended && !props.game.ended_at) props.endBoard(ended.winner, ended.newPlayerStats)
  }, [ended])

  useEffect(() => {
    if (props.players[props.currentPlayer]) {
      if (props.game.ended_at) setDisabled(true)
      else axios.get(`/api/boards/${props.board}/players/${props.players[props.currentPlayer].player.id}/open_tile`)
      .then((response) => {
        setDisabled(response.data);
      })
    }
  }, [props.players, props.currentPlayer])

  const playerData = function() {
    const now = new Date();

    return props.playerStats.map((player) => {
      const then = new Date(player.last_play);
      let last_move = 0;
      if (Math.round((now - then)/(1000*60*60*24)) < 2) last_move = `${Math.round((now - then)/(1000*60*60))} hour${Math.round((now - then)/(1000*60*60)) === 1 ? '' : 's'} ago`
      else last_move = `${Math.round((now - then)/(1000*60*60*24))} day${Math.round((now - then)/(1000*60*60*24)) === 1 ? '' : 's'} ago`

      return (
        <div className="player-status" style={{marginBottom: (props.players.length > 3) ? '0.5%' : '5%', borderColor: ((player.player.user.id === props.user.id) ? 'white' : 'black'), backgroundColor: player.color}} key={player.id}>
          <div className="player-name">
            <strong>{player.name}</strong>
          </div>
          <br></br>
          <div className="stats">
            ↳ Books Read: {player.books}
          </div>
          <div className="stats">
            ↳ Total Points: {player.points}
          </div>
          <div className="stats">
            ↳ Last Move: {last_move}
          </div>
        </div>
      )
    })
  } 
  
  return (
    <div style={props.players.length > 3 ? {width: '23vw', minWidth: '450px'} : {}} className="side-bar">
      {props.game.win_requirement === 'Points' && <h3>Points to Win: {props.game.win_points}</h3>}
      <div style={props.players.length > 3 ? {display: 'flex', flexDirection: 'row', flexWrap: 'wrap'} : {}} className="player-statuses">
        {playerData()}
      </div>
      <Roll user={props.user} disabled={disabled} setDisabled={setDisabled} currentPlayer={props.currentPlayer} rollDice={props.rollDice} players={props.players} board={props.board} />
      {props.showReview &&
        <div className="individual-card" >
          <div className="individual-congrats-header">
            <h2 style={{fontSize: 20, margin: '0'}}>{props.review.name}'s Review</h2>
          </div>
          <p style={{fontSize: 16, padding: '5px'}}>{props.review.text}</p>
        </div>}
    </div>
  )
}