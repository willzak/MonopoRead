import React from "react";
import Colour from "./colourTile";
import Square from "./square";


export default function Tile(props) {
  let type = props.direction + "-game-tile tile";

  return (
    <div className={type}>
      <Colour colour={props.colour} />
      <Square pos={props.pos} direction={props.direction} tile={props.tile} players={props.players} currentPlayer={props.currentPlayer} />
    </div>
  )
};


