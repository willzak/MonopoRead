import React from "react";
import Tile from "./gameTile";
import Console from "./console";
import Corner from "./cornerTile";
import Chance from "./chanceTile";

export default function Board(props) {
  return (
    <div>
    <div class="bottom-row">
      <Corner player={null}/>
      <Tile colour="brown-tile" player={null} direction="top"/>
      <Tile colour="brown-tile" player={null} direction="top"/>
      <Chance player={null} direction="top"/>
      <Tile colour="skyblue-tile" player={null} direction="top"/>
      <Tile colour="skyblue-tile" player={null} direction="top"/>
      <Corner player={null}/>
    </div>
    <div class="column-organiser">
      <div>
        <Tile colour="fuchsia-tile" player={null} direction="left"/>
        <Tile colour="fuchsia-tile" player={null} direction="left"/>
        <Chance player={null} direction="left" />
        <Tile colour="orange-tile" player={null} direction="left"/>
        <Tile colour="orange-tile" player={null} direction="left"/>
      </div>
      <Console/>
      <div>
        <Tile colour="red-tile" player={null} direction="right"/>
        <Tile colour="red-tile" player={null} direction="right"/>
        <Chance player={null} direction="right" />
        <Tile colour="yellow-tile" player={null} direction="right"/>
        <Tile colour="yellow-tile" player={null} direction="right"/>
      </div>
    </div>
    <div class="bottom-row">
      <Corner player={null}/>
      <Tile colour="green-tile" player={null} direction="bottom"/>
      <Tile colour="green-tile" player={null} direction="bottom"/>
      <Chance player={null} direction="bottom" />
      <Tile colour="blue-tile" player={null} direction="bottom"/>
      <Tile colour="blue-tile" player={null} direction="bottom"/>
      <Corner player={null}/>
    </div>
    </div>
  )
}