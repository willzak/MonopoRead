import React, { useState } from "react";

import Dice from "react-dice-roll";

import './dice.css'

export default function Roll(props) {
  const [index, setIndex] = useState(props.user.id - 1)
  const cheat = [2, 4, 3, 4, 6, 5, 3, 5]
  //2, submit, 4, don't take train, 3, chance, 4, pass go, don't submit (ends with 2-6 points)
  //6, take train, 5, submit book, 3, pass go and submit same book as first player, 5, submit book and win (ends with 10 points)
  //winning points can be 8-10
  //users need to be id 1 and 5

  const roll = function(value, currentPlayer) {
    props.setDisabled(true)
    props.rollDice(value, currentPlayer)
    setIndex(current => current + 1)
  }
  return(
    <div className="dice">
      <Dice disabled={props.disabled} onRoll={(value) => roll(value, props.currentPlayer)} size={100} cheatValue={props.user.id === 2 ? 5 : cheat[index] % cheat.length} />
    </div>
  )
}