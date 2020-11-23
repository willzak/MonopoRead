import React from "react";

export default function Chance(props) {
  let type = "chance chance";
  let text = "chance-text-";

  if (props.direction === 'left') {
    type += '-left';
    text += 'left';
  } else if (props.direction === 'right') {
    type += '-right';
    text += 'right';
  } else if (props.direction === 'top') {
    type += '-top';
    text += 'top';
  } else {
    type += '-bottom'
    text += 'bottom';
  }

  return (
    <div class={type}>
      {props.player}
      <div class={text}><strong>?</strong></div>
    </div>
  )
}