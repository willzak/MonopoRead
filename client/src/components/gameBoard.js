import React, {useState, useEffect} from "react";
import Tile from "./gameTile";
import Console from "./console";
import Corner from "./cornerTile";
import Chance from "./chanceTile";
import axios from 'axios';

export default function Board(props) {
  const [tiles, setTiles] = useState([])

  useEffect(() => {
    axios.get('/api/boards/881891715/board_tiles')
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
  }, [])

  return (
    <div className="game-board">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="bottom-row">
        <Corner player={null}/>
        <Tile colour="red-tile" player={null} direction="top"/>
        <Tile colour="red-tile" player={null} direction="top"/>
        <Chance player={null} direction="top" />
        <Tile colour="yellow-tile" player={null} direction="top"/>
        <Tile colour="yellow-tile" player={null} direction="top"/>
        <Corner player={null}/>
      </div>
      <div className="column-organiser">
        <div>
          <Tile colour="fuchsia-tile" player={null} direction="left" id ={tiles[0] ? tiles[0].id : "1"} name ={tiles[0] ? tiles[0].name : "Read A Poetry Book"}/>
          <Tile colour="fuchsia-tile" player={null} direction="left" id = "2" name = "Read A Sci-Fi Book"/>
          <Chance player={null} direction="left" />
          <Tile colour="orange-tile" player={null} direction="left" id = "3" name = "Read A Horror Book"/>
          <Tile colour="orange-tile" player={null} direction="left" id = "4" name = "Read A Fantasy Book"/>
        </div>
        <Console tiles={tiles}/>
        <div>
          <Tile colour="green-tile" player={null} direction="right"/>
          <Tile colour="green-tile" player={null} direction="right"/>
          <Chance player={null} direction="right" />
          <Tile colour="blue-tile" player={null} direction="right"/>
          <Tile colour="blue-tile" player={null} direction="right"/>
        </div>
      </div>
      <div className="bottom-row">
        <Corner player={null}/>
        <Tile colour="skyblue-tile" player={null} direction="bottom"/>
        <Tile colour="skyblue-tile" player={null} direction="bottom"/>
        <Chance player={null} direction="bottom"/>
        <Tile colour="brown-tile" player={null} direction="bottom"/>
        <Tile colour="brown-tile" player={null} direction="bottom"/>
        <Corner player={null}/>
      </div>
    </div>
  )
}