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
        <Tile pos={13} colour="red-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" id={props.tiles[0] ? props.tiles[0].id : ""} name ={props.tiles[0] ? props.tiles[0].name : ""}/>
        <Tile pos={14} colour="red-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" id={props.tiles[1] ? props.tiles[1].id : ""} name ={props.tiles[1] ? props.tiles[1].name : ""}/>
        <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={15} id="Chance1" players={props.players} direction="top" />
        <Tile pos={16} colour="yellow-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" id={props.tiles[2] ? props.tiles[2].id : ""} name ={props.tiles[2] ? props.tiles[2].name : ""}/>
        <Tile pos={17} colour="yellow-tile" currentPlayer={props.currentPlayer} players={props.players} direction="top" id={props.tiles[3] ? props.tiles[3].id : ""} name ={props.tiles[3] ? props.tiles[3].name : ""}/>
        <Corner pos={18} id="Corner2" currentPlayer={props.currentPlayer} players={props.players}/>
      </div>
      <div className="column-organiser">
        <div>
          <Tile pos={11} colour="fuchsia-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" id={props.tiles[4] ? props.tiles[4].id : ""} name ={props.tiles[4] ? props.tiles[4].name : ""}/>
          <Tile pos={10} colour="fuchsia-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" id={props.tiles[5] ? props.tiles[5].id : ""} name ={props.tiles[5] ? props.tiles[5].name : ""}/>
          <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={9} id="Chance2" players={props.players} direction="left" />
          <Tile pos={8} colour="orange-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" id={props.tiles[6] ? props.tiles[6].id : ""} name ={props.tiles[6] ? props.tiles[6].name : ""}/>
          <Tile pos={7} colour="orange-tile" currentPlayer={props.currentPlayer} players={props.players} direction="left" id={props.tiles[7] ? props.tiles[7].id : ""} name ={props.tiles[7] ? props.tiles[7].name : ""}/>
        </div>
        <Console tiles={props.tiles} currentPlayer={props.currentPlayer} players={props.players} board={props.board} />
        <div>
          <Tile pos={19} colour="green-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" id={props.tiles[8] ? props.tiles[8].id : ""} name ={props.tiles[8] ? props.tiles[8].name : ""}/>
          <Tile pos={20} colour="green-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" id={props.tiles[9] ? props.tiles[9].id : ""} name ={props.tiles[9] ? props.tiles[9].name : ""}/>
          <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={21} id="Chance3" players={props.players} direction="right" />
          <Tile pos={22} colour="blue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" id={props.tiles[10] ? props.tiles[10].id : ""} name ={props.tiles[10] ? props.tiles[10].name : ""}/>
          <Tile pos={23} colour="blue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="right" id={props.tiles[11] ? props.tiles[11].id : ""} name ={props.tiles[11] ? props.tiles[11].name : ""}/>
        </div>
      </div>
      <div className="bottom-row">
        <Corner pos={6} id="Corner3" currentPlayer={props.currentPlayer} players={props.players}/>
        <Tile pos={5} colour="skyblue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" id={props.tiles[12] ? props.tiles[12].id : ""} name ={props.tiles[12] ? props.tiles[12].name : ""}/>
        <Tile pos={4} colour="skyblue-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" id={props.tiles[13] ? props.tiles[13].id : ""} name ={props.tiles[13] ? props.tiles[13].name : ""}/>
        <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={3} id="Chance4" players={props.players} direction="bottom"/>
        <Tile pos={2} colour="brown-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" id={props.tiles[14] ? props.tiles[14].id : ""} name ={props.tiles[14] ? props.tiles[14].name : ""}/>
        <Tile pos={1} colour="brown-tile" currentPlayer={props.currentPlayer} players={props.players} direction="bottom" id={props.tiles[15] ? props.tiles[15].id : ""} name ={props.tiles[15] ? props.tiles[15].name : ""}/>
        <Corner pos={0} id="Corner4" currentPlayer={props.currentPlayer} players={props.players}/>
      </div>
    </div>
  )
}