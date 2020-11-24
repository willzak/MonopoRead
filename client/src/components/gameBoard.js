import React from "react";
import Tile from "./gameTile";
import Console from "./console";
import Corner from "./cornerTile";
import Chance from "./chanceTile";
import Token from "./token.js";

export default function Board(props) {
  return (
    <>
    <div class="game-board">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div class="bottom-row">
        <Corner player={null}/>
        <Tile colour="red-tile" player={null} direction="top"/>
        <Tile colour="red-tile" player={null} direction="top"/>
        <Chance player={null} direction="top" />
        <Tile colour="yellow-tile" player={null} direction="top"/>
        <Tile colour="yellow-tile" player={null} direction="top"/>
        <Corner player={null}/>
      </div>
      <div class="column-organiser">
        <div>
          <Tile colour="fuchsia-tile" player={true} direction="left" id = "1" name = "Read A Poetry Book"/>
          <Tile colour="fuchsia-tile" player={null} direction="left" id = "2" name = "Read A Sci-Fi Book"/>
          <Chance player={null} direction="left" />
          <Tile colour="orange-tile" player={null} direction="left" id = "3" name = "Read A Horror Book"/>
          <Tile colour="orange-tile" player={null} direction="left" id = "4" name = "Read A Fantasy Book"/>
        </div>
        <Console/>
        <div>
          <Tile colour="green-tile" player={null} direction="right"/>
          <Tile colour="green-tile" player={null} direction="right"/>
          <Chance player={null} direction="right" />
          <Tile colour="blue-tile" player={null} direction="right"/>
          <Tile colour="blue-tile" player={null} direction="right"/>
        </div>
      </div>
      <div class="bottom-row">
        <Corner player={null}/>
        <Tile colour="skyblue-tile" player={null} direction="bottom"/>
        <Tile colour="skyblue-tile" player={null} direction="bottom"/>
        <Chance player={null} direction="bottom"/>
        <Tile colour="brown-tile" player={null} direction="bottom"/>
        <Tile colour="brown-tile" player={null} direction="bottom"/>
        <Corner player={null}/>
      </div>
    </div>
    </>
  )
}