import Axios from "axios";
import React, { useState, useEffect} from "react";

import "./cornerInfo.css";

export default function ResultInfo(props) {
  const [winner, setWinner] = useState('')

  useEffect(() => {
    if (props.board !== 0) {
    Axios.get(`/api/boards/${props.board}/winner`)
      .then((response) => {
        setWinner(response.data)
      })
    }
  }, [props.board])

  return (
    <div className="individual-card" >
      <div className="individual-card-header" style={{backgroundColor: winner ? winner.player.color.hexcode : ''}}>
        <h1>Result</h1>
      </div>
      <div className="individual-card-body">
        <h3>The Game has Ended</h3>
        <h3 style={{color: winner ? winner.player.color.hexcode : ''}}>Winner was: {winner ? winner.player.user.name : ''}</h3>
        {winner.player ? <h3 style={{color: props.players[props.currentPlayer].player.id === winner.player.player.id ? 'green' : 'red'}}>{props.players[props.currentPlayer].player.id === winner.player.player.id ? 'You won!' : 'You lost!'}</h3> : null}
      </div>
    </div>
  )
}