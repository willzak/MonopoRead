import React, { useState, useEffect } from "react"
import axios from 'axios';
import TextField from '@material-ui/core/TextField'; 
import "./setgame.css";



export default function Player( props ) {
  const [gameName, setGameName] = useState("")


  return (
    <>
    <div className="game-name-form">
   <h1>Choose A Game Name</h1>
   <TextField id="standard-basic" label="Type your game name here" type="text"  name="title" value={gameName} onChange={(event) => setGameName(event.target.value)}/>
   <br/>
   </div>
   <button>Next Step</button>
   </>
  )
}