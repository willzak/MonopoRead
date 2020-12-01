import React from "react";
import Colour from "./colourTile";
import Square from "./square";

import './gameTile.css';


export default function Tile(props) {
  let type = props.direction + "-game-tile tile";

  for (let user of props.players) {
    if (!user.player.moving && props.occupied === user.player.final_position) {
      type += "-notification";
    }
  }

  return (
    <div className={type}>
      <Colour colour={props.colour} />
      <Square pos={props.pos} occupied={props.occupied} landTile={props.landTile} direction={props.direction} board={props.board} tile={props.tile} players={props.players} currentPlayer={props.currentPlayer} game={props.game} />
    </div>
  )
};


