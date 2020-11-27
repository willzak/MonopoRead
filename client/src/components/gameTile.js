import React from "react";
import Colour from "./colourTile";
import Square from "./square";

import './gameTile.css';


export default function Tile(props) {
  let type = props.direction + "-game-tile tile";

  return (
    <div className={type}>
      <Colour colour={props.colour} />
      <Square pos={props.pos} landTile={props.landTile} direction={props.direction} board={props.board} tile={props.tile} players={props.players} currentPlayer={props.currentPlayer} />
    </div>
  )
};


