
import React from "react";
import Colour from "./colourTile";
import Square from "./square";

export default function Tile(props) {
  let type = props.direction + "-game-tile tile";

  return (
    <div class={type}>
      <Colour colour={props.colour} />
      <Square direction={props.direction} name = {props.name} id = {props.id}/>
    </div>
  )
};