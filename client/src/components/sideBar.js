import React, {useState, useEffect} from "react";
import axios from 'axios';

import Roll from "./dice";
import './sideBar.css'

export default function SideBar(props) {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    axios.get(`/api/boards/${props.board}/player_stats`)
    .then((response) => {
      // handle success
      setPlayers(response.data.map(player => {
        return {
          player: player,
          id: player.player.id,
          color: player.color.hexcode,
          name: player.user.name,
          books: player.books,
          last_play: player.last_play
        }
      }));
    }) 
  }, [props.board])

  const playerData = function() {
    const now = new Date();

    return players.map(player => {
      const then = new Date(player.last_play);
      let last_move = 0;
      if (Math.round((now - then)/(1000*60*60*24)) < 2) last_move = `${Math.round((now - then)/(1000*60*60))} hours ago`
      else last_move = `${Math.round((now - then)/(1000*60*60*24))} days ago`

      return (
        <div class="player-status" style={{backgroundColor: player.color}} key={player.id}>
          <div>
            <strong>{player.name}</strong>
          </div>
          <br></br>
          <div class="stats">
            • Books Read: {player.books}
          </div>
          <div class="stats">
            • Last Move: {last_move}
          </div>
        </div>
      )
    })
  } 

  return (
    <div class="side-bar">
      {playerData()}
      <Roll />
    </div>
  )
}