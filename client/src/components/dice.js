import React from "react";

import Dice from "react-dice-roll";

export default function Roll(props) {
  return(
    <div class="dice">
      <Dice onRoll={(value) => console.log(value)} size={100}/>
    </div>
  )
}