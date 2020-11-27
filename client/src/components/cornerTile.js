import React, { useEffect } from "react";
import Token from "./token";

import "./cornerTile.css";

export default function Corner(props) {

  useEffect(() => {
    const player = props.players[props.currentPlayer]
    if (props.passGo && props.players.length > 0 && props.pos === player.player.position && (player.player.moving || player.player.done)) {
      props.passGo(props.currentPlayer)
    }
  }, [props.players[props.currentPlayer] ? props.players[props.currentPlayer].player.position : []])

  const activePlayers = function() {
    return props.players.map((player) => {
      if (props.pos === player.player.position) {
        return <Token key={player.player.id} color={player.color.hexcode} />
      }
      else return null
    })
  }

  if (props.id === "Corner4") {
    return (
      <div className="corner">
        <div className="corner-style-container">
          <div className="corner-text">
            <img src={window.location.origin + '/Go_Text.png'} alt="MonopoRead Go" className="go-text" />
          </div>
          <div className="arrow-contaier">
            <img src={window.location.origin + '/Monopoly_Go_Arrow.png'} alt="MonopoRead Arrow" className="arrow" />
          </div>
        </div>
        {activePlayers()}
      </div>
    )
  } else if (props.id === "Corner1") {
    return (
      <div className="corner-flipped">
        <div className="corner-style-container-flipped">
          <div>
            <img src={window.location.origin + '/Go_Text.png'} alt="MonopoRead Go" className="go-text-flipped" />
          </div>
          <img src={window.location.origin + '/Monopoly_Go_Arrow.png'} alt="MonopoRead Arrow" className="arrow-flipped" />
        </div>
        {activePlayers()}
      </div>
    )
  } else if (props.id === "Corner3") {
      return (
        <img src={window.location.origin + '/central-station.png'} alt="Railroad 1" className="Corner3" />
      )
  } else {
    return (
      <img src={window.location.origin + '/reading-railroad.png'} alt="Railroad 2" className="Corner2"/>
    )
  }

}