import React from "react";

import Dice from "react-dice-roll";

import './dice.css'

export default function Roll(props) {
  return(
    <div className="dice">
      <Dice disabled={props.disabled} onRoll={(value) => props.rollDice(value, props.currentPlayer)} size={100} />
    </div>
  )
}