import React, { useState } from "react";

import Dice from "react-dice-roll";

import './dice.css'

export default function Roll(props) {
  const [index, setIndex] = useState(props.user.id - 1)
  const cheat = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]

  const roll = function(value, currentPlayer) {
    props.setDisabled(true)
    props.rollDice(value, currentPlayer)
    setIndex(current => current + 1)
  }
  return(
    <div className="dice">
      <Dice disabled={props.disabled} onRoll={(value) => roll(value, props.currentPlayer)} size={100} cheatValue={cheat[index] % cheat.length} />
    </div>
  )
}