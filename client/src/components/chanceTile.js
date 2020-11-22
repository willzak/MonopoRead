import React from "react";

export default function Chance(props) {
  let type = "chance";

  if (props.direction === 'left') {
    type += '-left';
  } else if (props.direction === 'right') {
    type += '-right';
  } else if (props.direction === 'top') {
    type += '-top';
  }

  return (
    <div class={type}>{props.player}?</div>
  )
}