import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Token from "./token";

export default function Player( props ) {
  const [colors, setColors] = useState([])
  const [name, setName] = useState('')
  const [color, setColor] = useState(0)

  const history =  useHistory ()

  useEffect(() => {
    if (props.game !== 0) {
      axios.get(`/api/games/${props.game.id}`)
      .then((response) => {
        setName(response.data.name)
        return axios.get(`/api/games/${props.game.id}/free_colors`)
      })
      .then((response) => {
        setColors(response.data)
        setColor(response.data[0])
      })
    }
  }, [props.game])

  const clickHandler = () => {
    axios.post(`/api/games/${props.game.id}/players`, { user_id: props.user.id, color_id: color.id, score: 0, position: 0, moving: false, final_position: 0 })
    .then(() => {
      props.getCurrentBoard(props.game.id)
      .then(() => history.push("/board"))
    })
  }

  const changeHandler = function(event) {
    for (const color of colors) if (color.name === event.target.value) setColor(color)
  }

  return (
    <div>
      <h1> Player Form  </h1>
      <h2> Game Name: {name}</h2>
      <form>
      <label htmlFor="player-color">Choose a Color: </label>
        <select onChange={changeHandler} name="colors">
          {colors.map ((color, index) =>{
          return <option key={index}>{color.name}</option>
          })}
        </select>
      </form>
      <Token color={color.hexcode} />
      <button onClick={clickHandler}> Submit </button>
    </div>
  )
}