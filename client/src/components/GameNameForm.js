import React, { useState, useEffect } from "react"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField'; 
import "./GameNameForm.css";

export default function GameNameForm( props ) {
  const [gameName, setGameName] = useState("")
  const [colors, setColors] = useState([])
  const [color, setColor] = useState(0)
  
  const history =  useHistory ()

  useEffect(() => {
    axios.get(`/api/colors`)
    .then((response) => {
      setColors(response.data)
      setColor(response.data[0].id)
    })
  }, [])

  const clickHandler = function() {
    let game
    axios.post(`/api/games/`, { user_id: props.user, name: gameName })
    .then((response) => {
      game = response.data.id
      props.setGame(game)
      return axios.post(`/api/games/${game}/players`, { user_id: props.user, color_id: color, score: 0, position: 0, moving: false, final_position: 0 })
    })
    .then(() => {
      props.getCurrentBoard(game)
      .then(() => history.push("/board"))
    })
  }

  const changeHandler = function(event) {
    for (const color of colors) if (color.name === event.target.value) setColor(color.id)
  }

  return (
    <div>
      <div className="game-name-form">
        <h1>Choose A Game Name</h1>
        <TextField id="standard-basic" label="Type your game name here" type="text"  name="title" value={gameName} onChange={(event) => setGameName(event.target.value)}/>
        <br/>
    </div>
      <label htmlFor="player-color">Choose a Color: </label>
        <select onChange={changeHandler} name="colors">
          {colors.map ((color, index) =>{
          return <option key={index}>{color.name}</option>
          })}
        </select>
    <button onClick={clickHandler}>Submit</button>
    </div>
  )
}