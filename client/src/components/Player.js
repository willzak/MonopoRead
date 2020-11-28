import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function Player( props ) {
  const [colors, setColors] = useState([])
  const [name, setName] = useState('')
  const [color, setColor] = useState(0)

  const history =  useHistory ()

  useEffect(() => {
    if (props.game !== 0) {
      axios.get(`/api/games/${props.game}`)
      .then((response) => {
        setName(response.data.name)
        return axios.get(`/api/games/${props.game}/free_colors`)
      })
      .then((response) => {
        setColors(response.data)
        setColor(response.data[0].id)
      })
    }
  }, [props.game])

  const clickHandler = () => {
    axios.post(`/api/games/${props.game}/players`, { user_id: props.user, color_id: color, score: 0, position: 0, moving: false, final_position: 0 })
    .then(() => {
      props.getCurrentBoard(props.game)
      .then(() => history.push("/board"))
    })
  }

  const changeHandler = function(event) {
    for (const color of colors) if (color.name === event.target.value) setColor(color.id)
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
      <button onClick={clickHandler}> Submit </button>
    </div>
  )
}