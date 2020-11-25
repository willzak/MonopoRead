import React from "react";
import Tile from "./gameTile";
import Console from "./console";
import Corner from "./cornerTile";
import Chance from "./chanceTile";

export default function Board(props) {

  return (
    <div className="game-board">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="bottom-row">
        <Corner pos={12} id="Corner1" currentPlayer={props.currentPlayer} players={props.players}/>
        <Tile pos={13} colour="red-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" tile={props.tiles[0]}/>
        <Tile pos={14} colour="red-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" tile={props.tiles[1]}/>
        <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={15} id="Chance1" players={props.players} direction="top" />
        <Tile pos={16} colour="yellow-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" tile={props.tiles[2]}/>
        <Tile pos={17} colour="yellow-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" tile={props.tiles[3]}/>
        <Corner pos={18} id="Corner2" currentPlayer={props.currentPlayer} players={props.players}/>
      </div>
      <div className="column-organiser">
        <div>
          <Tile pos={11} colour="fuchsia-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" tile={props.tiles[4]}/>
          <Tile pos={10} colour="fuchsia-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" tile={props.tiles[5]}/>
          <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={9} id="Chance2" players={props.players} direction="left" />
          <Tile pos={8} colour="orange-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" tile={props.tiles[6]}/>
          <Tile pos={7} colour="orange-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" tile={props.tiles[7]}/>
        </div>
        <Console tiles={props.tiles} />
        <div>
          <Tile pos={19} colour="green-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" tile={props.tiles[8]}/>
          <Tile pos={20} colour="green-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" tile={props.tiles[9]}/>
          <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={21} id="Chance3" players={props.players} direction="right" />
          <Tile pos={22} colour="blue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" tile={props.tiles[10]}/>
          <Tile pos={23} colour="blue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" tile={props.tiles[11]}/>
        </div>
      </div>
      <div className="bottom-row">
        <Corner pos={6} id="Corner3" currentPlayer={props.currentPlayer} players={props.players}/>
        <Tile pos={5} colour="skyblue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" tile={props.tiles[12]}/>
        <Tile pos={4} colour="skyblue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" tile={props.tiles[13]}/>
        <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={3} id="Chance4" players={props.players} direction="bottom"/>
        <Tile pos={2} colour="brown-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" tile={props.tiles[14]}/>
        <Tile pos={1} colour="brown-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" tile={props.tiles[15]}/>
        <Corner pos={0} id="Corner4" currentPlayer={props.currentPlayer} players={props.players}/>
      </div>
    </div>
  )
}