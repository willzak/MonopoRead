import React, { useState, useEffect } from "react"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Token from "./token";
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
      setColor(response.data[0])
    })
  }, [])

  const clickHandler = function() {
    let game
    axios.post(`/api/games/`, { user_id: props.user, name: gameName })
    .then((response) => {
      game = response.data.id
      props.setGame(game)
      return axios.post(`/api/games/${game}/players`, { user_id: props.user, color_id: color.id, score: 0, position: 0, moving: false, final_position: 0 })
    })
    .then(() => {
      history.push("/board")
    })
  }

  const changeHandler = function(event) {
    for (const color of colors) if (color.name === event.target.value) setColor(color)
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
      <Token color={color.hexcode} />
    <button onClick={clickHandler}>Submit</button>
    </div>
  )
}