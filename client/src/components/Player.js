import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Token from "./token";
import "./Player.css"; 
import Button from "@material-ui/core/Button"


export default function Player( props ) {
  const [colors, setColors] = useState([])
  const [name, setName] = useState('')
  const [color, setColor] = useState(0)

  const history = useHistory()
  if (!props.game) history.push("/")

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
  }, [props.game ? props.game.id : []])

  const clickHandler = () => {
    props.joinGame(props.game, { color_id: color.id }, history);
  }

  const changeHandler = function(event) {
    for (const color of colors) if (color.name === event.target.value) setColor(color)
  }

  return (
    <div className ="color-form-page">
      <div>
        <h2> Joining Game: {name}</h2>
      </div>
      
      <div className="color-picker-form">
        <img src ="Monopoly_Train.png" alt="train" className="train" />
        <h1> Pick A Color  </h1>

        <form>
          <select onChange={changeHandler} name="colors">
            {colors.map ((color, index) =>{
            return <option key={index}>{color.name}</option>
            })}
          </select>
        </form>
        <Token color={color.hexcode} />
        <Button  variant="outlined"  style={{ fontSize: '1em', "font-weight": 'bolder', margin: "10px" }} onClick={clickHandler}> Submit </Button>
      </div>
    </div>
  )
}