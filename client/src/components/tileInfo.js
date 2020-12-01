import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './tileInfo.css';
import Form from './bookForm.js';
import Description from "./tileDescription.js";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button'; 

export default function TileInfo( {data, submit, players, currentPlayer, board, saveBook, setShowReview, setReview}) {
  const  {tileId}  = useParams(); 

  const tile = data.find((t) => t.id === Number(tileId));
  let tileData; 

  const [showForm, setShowForm] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [congrats, setCongrats] = useState(false)
  
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
      <div className="individual-tile" >
        <div className="individual-tile-header" style={ {background: `${tile.colour}`} } >
        <h1> {tile.name}</h1>
        <Link to="/board" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className= "individual-tile-body">
        
        { showInfo ? <div><Description
          congrats={congrats}
          setReview = {setReview}
          setShowReview = {setShowReview}
          description = {tile.description} 
          books = {tile.books} 
          firstbookrec = {tile.recommendation[0]} 
          secondbookrec = {tile.recommendation[1]} 
          thirdbookrec = {tile.recommendation[2]} 
          /></div> : null }
        { showButton ? <div className="button-div"><Button variant="outlined" style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick = {onClick}>Completed</Button></div> : null }
        { showForm ? <Form setShowInfo={setShowInfo} setCongrats={setCongrats} setShowForm={setShowForm} saveBook={saveBook} tile={tile} currentPlayer={currentPlayer} players={players} board={board}/> : null }
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