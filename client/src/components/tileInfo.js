import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './tileInfo.css'

export default function TileInfo( {data}, props ) {

  const  {tileId}  = useParams(); 

  const tile = data.find((t) => t.id === Number(tileId));
  let tileData; 

  if (tile) {
    tileData = (
      <div class = "indvidual-tile" >
        <div class = "individual-tile-header" style={ {background: `${tile.colour}`} } >
        <h2> This is ID: {tileId}</h2>
        <h1> {tile.name}</h1>
        </div>
        <div class = "individual-tile-body">
        <h3> {tile.description}</h3>
        <h2> We Recommend: </h2>
        <h3> {tile.recommendation[0]} </h3>
        <h3> {tile.recommendation[1]} </h3>
        <h3> {tile.recommendation[2]} </h3>
        </div>
      </div>
    )
  } else {
    tileData = <h4>Sorry! That tile id doesn't exist</h4>
  }
return (

  <div>
    {tileData}
  </div>

); 

};