import React, {useState, useEffect} from "react";
import axios from 'axios';

import Roll from "./dice";
import './sideBar.css'

export default function SideBar(props) {
  const [playerStats, setPlayerStats] = useState([])

  useEffect(() => {
    if (props.board !== 0) {
      axios.get(`/api/boards/${props.board}/player_stats`)
      .then((response) => {
        // handle success
        setPlayerStats(response.data.map(player => {
          return {
            player: player,
            id: player.player.id,
            color: player.color.hexcode,
            name: player.user.name,
            points: player.points,
            last_play: player.last_play
          }
        }));
      })
    }
  }, [props.board, props.chance])

  const playerData = function() {
    const now = new Date();

    return playerStats.map(player => {
      const then = new Date(player.last_play);
      let last_move = 0;
      if (Math.round((now - then)/(1000*60*60*24)) < 2) last_move = `${Math.round((now - then)/(1000*60*60))} hours ago`
      else last_move = `${Math.round((now - then)/(1000*60*60*24))} days ago`

      return (
        <div className="player-status" style={{backgroundColor: player.color}} key={player.id}>
          <div>
            <strong>{player.name}</strong>
          </div>
          <br></br>
          <div className="stats">
            • Books Read: {player.points}
          </div>
          <div className="stats">
            • Last Move: {last_move}
          </div>
        </div>
      )
    })
  } 

  return (
    <div className="side-bar">
      {playerData()}
      <Roll players={props.players} rollDice={props.rollDice} board={props.board} />
    </div>
  )
}