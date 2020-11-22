
import React from "react";

export default function Tile(props) {

  if (props.direction === 'bottom') {
    return (
      <div>
        <div class={props.colour}></div>
        <div class="tile-body">{props.player}</div>
      </div>
    )
  } else if (props.direction === 'top') {
    return (
      <div>
        <div class="tile-body">{props.player}</div>
        <div class={props.colour}></div>
      </div>
    )
  } else if (props.direction === 'left') {
    let colour = "side-";
    colour += props.colour;
    return (
      <div class="side">
        <div class="side-tile">{props.player}</div>
        <div class={colour}></div>
      </div>
    )
  } else {
    let colour = "side-";
    colour += props.colour;
    return (
      <div class="side">
        <div class={colour}></div>
        <div class="side-tile">{props.player}</div>
      </div>
    )
  }
};