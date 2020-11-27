import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './tileInfo.css';
import Form from './bookForm.js';
import Description from "./tileDescription.js";
import CancelIcon from '@material-ui/icons/Cancel';

export default function TileInfo( {data, submit, players, currentPlayer, board, saveBook, setShowReview, setReview}) {
  const  {tileId}  = useParams(); 

  const tile = data.find((t) => t.id === Number(tileId));
  let tileData; 

  const [showForm, setShowForm] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [showButton, setShowButton] = useState(false)
  
  useEffect(() => {
    setShowButton(submit)
  }, [submit])


  const onClick = () => {
    setShowInfo(false);
    setShowButton(false); 
    setShowForm(true);
   }


  if (tile) {

    tileData = (
      <div className="indvidual-tile" >
        <div className="individual-tile-header" style={ {background: `${tile.colour}`} } >
        <h1> {tile.name}</h1>
        <Link to="/" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className= "individual-tile-body">
        { showInfo ? <Description
          setReview = {setReview}
          setShowReview = {setShowReview}
          description = {tile.description} 
          books = {tile.books} 
          firstbookrec = {tile.recommendation[0]} 
          secondbookrec = {tile.recommendation[1]} 
          thirdbookrec = {tile.recommendation[2]} 
          /> : null }
        { showButton ? <button onClick = {onClick}>Completed!</button> : null }
        { showForm ? <Form saveBook={saveBook} tile={tile} currentPlayer={currentPlayer} players={players} board={board}/> : null }
        </div>
      </div>
    )
  } else {
    tileData = <h4>Sorry! That tile doesn't exist</h4>
  }
return (
  <>
  <div>
    {tileData}
  </div>
  </>
); 

};