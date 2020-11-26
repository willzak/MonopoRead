import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default function Form( props ) {
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  
  return (
    <div>
        <form className="book-form">
        <h3>Book Title(ISBN??)</h3>
          <input type="text"  name="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
   
        <h3>Leave a Review (optional)</h3>
          <input type="text" name="review" value={review} onChange={(event) => setReview(event.target.value)}/>
        
        </form>
        <button onClick={() => props.saveBook(props.currentPlayer, title, review, props.tile.board_tile_id)}>Submit!</button>
    </div>
    )
};