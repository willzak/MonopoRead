import React, { useState, useEffect } from "react"
import axios from 'axios';


export default function Player( props ) {
  // const [game, setGame] = useState(1)
  const [colors, setColors] = useState([])
  const [name, setName] = useState("")

useEffect(() => {
    axios.get(`/api/games/1`)
      .then((response) => {
        console.log("response for game data:", response.data.name)
        setName(response.data.name)
      })
  }, [])

  useEffect(() => {
   axios.get(`api/games/1/free_colors`)
      .then((response) => {
        console.log("This is response data:", response.data)
        setColors(response.data.map(color=> color.name))
      })
  }, [])
  console.log("this is colors", colors)

  return (
    <div>
      <h1> Player Form  </h1>
      <h2> Game Name: {name}</h2>
      <form>
      <label for="player-color">Choose a Color: </label>
        <select name="colors">
          {colors.map ((color, index) =>{
          return <option key={index} > {color}</option>
          })}
        </select>
      </form>
      <button> Submit </button>
    </div>
  )
}