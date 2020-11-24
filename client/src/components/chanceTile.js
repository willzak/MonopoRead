import React from "react";

export default function Chance(props) {
  let type = "tile chance chance";
  let text = "chance-icon-";
  let label = "label-";

  if (props.direction === 'left') {
    type += '-left';
    text += 'left';
    label += 'left';
  } else if (props.direction === 'right') {
    type += '-right';
    text += 'right';
    label += 'right';
  } else if (props.direction === 'top') {
    type += '-top';
    text += 'top';
    label += 'top';
  } else {
    type += '-bottom';
    text += 'bottom';
    label += 'bottom';
  }

  return (
    <div className={type}>
      <div className={text}>
        <strong>?</strong>
      </div>
      <div className={label}>
        Chance
      </div>
    </div>
  )
}