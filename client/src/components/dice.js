import React from "react";

import Dice from "react-dice-roll";

import './dice.css'

export default function Roll(props) {
  return(
    <div className="dice">
      <Dice onRoll={(value) => console.log(value)} size={100}/>
    </div>
  )
}