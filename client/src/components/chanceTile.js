import React from "react";

export default function Chance(props) {
  let type = "chance chance";

  if (props.direction === 'left') {
    type += '-left';
  } else if (props.direction === 'right') {
    type += '-right';
  } else if (props.direction === 'top') {
    type += '-top';
  } else {
    type += '-bottom'
  }

  return (
    <div class={type}>
      {props.player}
      <div class="chance-default"><strong>?</strong></div>
    </div>
  )
}