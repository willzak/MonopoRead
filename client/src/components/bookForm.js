import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField'; 
import LinearProgress from '@material-ui/core/LinearProgress';
import "./bookForm.css"

// styling the material-ui text field components  - can i do this in just css? - look into
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme) => ({
//   root: {
//       margin: theme.spacing(1),
//       display: 'flex', 
//       flexDirection: 'column', 
//       alignItems: 'center',
//     },
// }));


export default function Form( props ) {
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

 const history =  useHistory ()
  // const classes = useStyles();

  const clickHandler = () => {
    setLoading(true)
    props.saveBook(props.currentPlayer, title, review, props.tile.board_tile_id)
    .then ( () => {history.push("/")})
  }

  return (
    <div>
        <form className="book-form">
          <h3> Submit Your Book! </h3>
          <TextField id="standard-basic" label="Book Title" type="text"  name="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
          <br /> 
          <TextField  id="outlined-multiline-static" label="Leave A Review (optional)"  multiline rows={4} variant="outlined" type="text" name="review" value={review} onChange={(event) => setReview(event.target.value)}/>
        </form>
        <br />
        {loading && <LinearProgress />}
        { !loading &&  <button onClick={clickHandler}>Submit!</button>}
    </div>
    )
};