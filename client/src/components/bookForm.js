import React, { useState } from "react";
import axios from "axios"; 
// import './bookForm.css'


export default function Form( props ) {
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  
  const save = () => {
    console.log ("this has saved as", title)
    console.log("this review is", review)
    const playerID = props.players[props.currentPlayer].player.id
    console.log(playerID)
    console.log(props.tile.board_tile_id)
    axios.post(`/api/boards/${props.board}/players/${playerID}/submit`, {title: title, review: review, board_tile_id: props.tile.board_tile_id})
    .then (res => console.log(res.data))
  }
  
  return (
    <div>
        <form className="book-form">
        <h3>Book Title(ISBN??)</h3>
          <input type="text"  name="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
   
        <h3>Leave a Review (optional)</h3>
          <input type="text" name="review" value={review} onChange={(event) => setReview(event.target.value)}/>
        
        </form>
        <button onClick={save}>Submit!</button>
    </div>
    )
};