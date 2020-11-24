import React, {useState, useEffect} from "react";
import Tile from "./gameTile";
import Console from "./console";
import Corner from "./cornerTile";
import Chance from "./chanceTile";
import axios from 'axios';

export default function Board(props) {
  const [tiles, setTiles] = useState([])
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (props.board !== 0) {
      axios.get(`/api/boards/${props.board}/board_tiles`)
      .then((response) => {
        // handle success
        setTiles(response.data.map(tile => {
          return {
            tile: tile,
            id: tile.tile.id,
            name: tile.tile.name,
            colour: tile.color.hexcode,
            description: tile.tile.description,
            recommendation: tile.recommendations.map(rec => rec.book.name)
          }
        }));
      })
    }
  }, [props.board])

  useEffect(() => {
    if (props.board !== 0) {
      axios.get(`/api/boards/${props.board}/current_tiles`)
      .then((response) => {
        // handle success
        setPlayers(response.data);
      })
    }
  }, [props.board])

  return (
    <div className="game-board">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="bottom-row">
        <Corner id="Corner1" players={players}/>
        <Tile colour="red-tile" players={players} direction="top" id ={tiles[0] ? tiles[0].id : ""} name ={tiles[0] ? tiles[0].name : ""}/>
        <Tile colour="red-tile" players={players} direction="top" id ={tiles[1] ? tiles[1].id : ""} name ={tiles[1] ? tiles[1].name : ""}/>
        <Chance id="Chance1" players={players} direction="top" />
        <Tile colour="yellow-tile" players={players} direction="top" id ={tiles[2] ? tiles[2].id : ""} name ={tiles[2] ? tiles[2].name : ""}/>
        <Tile colour="yellow-tile" players={players} direction="top" id ={tiles[3] ? tiles[3].id : ""} name ={tiles[3] ? tiles[3].name : ""}/>
        <Corner id="Corner2" players={players}/>
      </div>
      <div className="column-organiser">
        <div>
          <Tile colour="fuchsia-tile" players={players} direction="left" id ={tiles[4] ? tiles[4].id : ""} name ={tiles[4] ? tiles[4].name : ""}/>
          <Tile colour="fuchsia-tile" players={players} direction="left" id ={tiles[5] ? tiles[5].id : ""} name ={tiles[5] ? tiles[5].name : ""}/>
          <Chance id="Chance2" players={players} direction="left" />
          <Tile colour="orange-tile" players={players} direction="left" id ={tiles[6] ? tiles[6].id : ""} name ={tiles[6] ? tiles[6].name : ""}/>
          <Tile colour="orange-tile" players={players} direction="left" id ={tiles[7] ? tiles[7].id : ""} name ={tiles[7] ? tiles[7].name : ""}/>
        </div>
        <Console tiles={tiles}/>
        <div>
          <Tile colour="green-tile" players={players} direction="right" id ={tiles[8] ? tiles[8].id : ""} name ={tiles[8] ? tiles[8].name : ""}/>
          <Tile colour="green-tile" players={players} direction="right" id ={tiles[9] ? tiles[9].id : ""} name ={tiles[9] ? tiles[9].name : ""}/>
          <Chance id="Chance3" players={players} direction="right" />
          <Tile colour="blue-tile" players={players} direction="right" id ={tiles[10] ? tiles[10].id : ""} name ={tiles[10] ? tiles[10].name : ""}/>
          <Tile colour="blue-tile" players={players} direction="right" id ={tiles[11] ? tiles[11].id : ""} name ={tiles[11] ? tiles[11].name : ""}/>
        </div>
      </div>
      <div className="bottom-row">
        <Corner id="Corner3" players={players}/>
        <Tile colour="skyblue-tile" players={players} direction="bottom" id ={tiles[12] ? tiles[12].id : ""} name ={tiles[12] ? tiles[12].name : ""}/>
        <Tile colour="skyblue-tile" players={players} direction="bottom" id ={tiles[13] ? tiles[13].id : ""} name ={tiles[13] ? tiles[13].name : ""}/>
        <Chance id="Chance4" players={players} direction="bottom"/>
        <Tile colour="brown-tile" players={players} direction="bottom" id ={tiles[14] ? tiles[14].id : ""} name ={tiles[14] ? tiles[14].name : ""}/>
        <Tile colour="brown-tile" players={players} direction="bottom" id ={tiles[15] ? tiles[15].id : ""} name ={tiles[15] ? tiles[15].name : ""}/>
        <Corner id="Corner4" players={players}/>
      </div>
    </div>
  )
}