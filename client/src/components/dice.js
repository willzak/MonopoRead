import React from "react";

import Dice from "react-dice-roll";

import './dice.css'

export default function Roll(props) {
  return(
    <div className="dice">
      <Dice disabled={false} onRoll={(value) => props.rollDice(value, props.currentPlayer)} size={100} cheatValue={3} />
    </div>
  )
}