import React, { useState } from "react";
import TextField from '@material-ui/core/TextField'; 
import LinearProgress from '@material-ui/core/LinearProgress';
import "./bookForm.css";
import Button from '@material-ui/core/Button'; 

export default function Form( props ) {
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    if (title) {
      setLoading(true)
      props.saveBook(props.currentPlayer, title, review, props.tile.board_tile_id)
        .then (() => {
          props.setCongrats(title)
          props.setShowInfo(true)
          props.setShowForm(false)
        })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div>
        <form onSubmit={submitHandler} className="book-form">
          <h3> Submit Your Book! </h3>
          <TextField id="standard-basic" label="Book Title" type="text"  name="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
          <br /> 
          <TextField  id="outlined-multiline-static" label="Leave A Review (optional)"  multiline rows={4} variant="outlined" type="text" name="review" value={review} onChange={(event) => setReview(event.target.value)}/>
        </form>
        <br />
        {loading && <LinearProgress />}
        { !loading &&  <Button variant="outlined" style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={clickHandler}>Submit</Button>}
    </div>
    )
};