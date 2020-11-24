import React from "react";
import Colour from "./colourTile";
import Square from "./square";


export default function Tile(props) {
  let type = props.direction + "-game-tile tile";

  return (
    <div className={type}>
      <Colour colour={props.colour} />
      <Square pos={props.pos} direction={props.direction} name = {props.name} id = {props.id} players = {props.players} />
    </div>
  )
};


