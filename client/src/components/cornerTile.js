import React from "react";
import Token from "./token";

import "./cornerTile.css";

export default function Corner(props) {

  const activePlayers = function() {
    return props.players.map((player) => {
      if (props.pos === player.player.position) return <Token key={player.player.id} color={player.color.hexcode} />
      else return null
    })
  }

  return (
    <div className="corner">
      <div className="corner-style-container">
        <div className="corner-text">
          GO
        </div>
        <div className="arrow">
          ➯
        </div>
      </div>
      {activePlayers()}
    </div>
  )
}