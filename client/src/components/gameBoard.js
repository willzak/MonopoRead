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
        <Corner passGo={props.passGo} pos={12} id="Corner1" currentPlayer={props.currentPlayer} players={props.players} occupied={props.occupied} occupied={props.occupied}/>
        <Tile pos={13} colour="red-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="top" tile={props.tiles[0]} occupied={props.occupied}/>
        <Tile pos={14} colour="red-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="top" tile={props.tiles[1]}occupied={props.occupied}/>
        <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={15} id="Chance1" players={props.players} board={props.board} landTile={props.landTile} direction="top" chance={props.chance} occupied={props.occupied}/>
        <Tile pos={16} colour="yellow-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="top" tile={props.tiles[2]} occupied={props.occupied}/>
        <Tile pos={17} colour="yellow-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="top" tile={props.tiles[3]} occupied={props.occupied}/>
        <Corner pos={18} id="Corner2" currentPlayer={props.currentPlayer} players={props.players} occupied={props.occupied}/>
      </div>
      <div className="column-organiser">
        <div>
          <Tile pos={11} colour="fuchsia-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="left" tile={props.tiles[4]} occupied={props.occupied}/>
          <Tile pos={10} colour="fuchsia-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="left" tile={props.tiles[5]} occupied={props.occupied}/>
          <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={9} id="Chance2" players={props.players} board={props.board} landTile={props.landTile} direction="left" chance={props.chance} occupied={props.occupied}/>
          <Tile pos={8} colour="orange-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="left" tile={props.tiles[6]} occupied={props.occupied}/>
          <Tile pos={7} colour="orange-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="left" tile={props.tiles[7]} occupied={props.occupied}/>
        </div>
        <Console transport={props.transport} setReview={props.setReview} setShowReview={props.setShowReview} tiles={props.tiles} saveBook={props.saveBook} currentPlayer={props.currentPlayer} players={props.players} board={props.board} chance={props.chance} occupied={props.occupied}/>
        <div>
          <Tile pos={19} colour="green-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="right" tile={props.tiles[8]} occupied={props.occupied}/>
          <Tile pos={20} colour="green-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="right" tile={props.tiles[9]} occupied={props.occupied}/>
          <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={21} id="Chance3" players={props.players} board={props.board} landTile={props.landTile} direction="right" chance={props.chance} occupied={props.occupied}/>
          <Tile pos={22} colour="blue-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="right" tile={props.tiles[10]} occupied={props.occupied}/>
          <Tile pos={23} colour="blue-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="right" tile={props.tiles[11]} occupied={props.occupied}/>
        </div>
      </div>
      <div className="bottom-row">
        <Corner pos={6} id="Corner3" currentPlayer={props.currentPlayer} players={props.players} occupied={props.occupied}/>
        <Tile pos={5} colour="skyblue-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="bottom" tile={props.tiles[12]} occupied={props.occupied}/>
        <Tile pos={4} colour="skyblue-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="bottom" tile={props.tiles[13]} occupied={props.occupied}/>
        <Chance drawChance={props.drawChance} currentPlayer={props.currentPlayer}  pos={3} id="Chance4" players={props.players} board={props.board} landTile={props.landTile} direction="bottom" chance={props.chance} occupied={props.occupied}/>
        <Tile pos={2} colour="brown-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="bottom" tile={props.tiles[14]} occupied={props.occupied}/>
        <Tile pos={1} colour="brown-tile" currentPlayer={props.currentPlayer} players={props.players} board={props.board} landTile={props.landTile} direction="bottom" tile={props.tiles[15]} occupied={props.occupied}/>
        <Corner passGo={props.passGo} pos={0} id="Corner4" currentPlayer={props.currentPlayer} players={props.players} occupied={props.occupied}/>
      </div>
    </div>
  )
}