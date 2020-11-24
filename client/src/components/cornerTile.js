import React from "react";
import Token from "./token";

export default function Corner(props) {

  const activePlayers = function() {
    return props.players.map((player) => {
      if (props.id === 'Corner4' && !player.current_tile) return <Token key={player.player.id} color={player.color.hexcode} />
      else return null
    })
  }

  return (
    <div className="corner">{activePlayers()}</div>
  )
}