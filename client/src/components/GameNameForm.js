import React, { Fragment, useState, useEffect } from "react"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Token from "./token";
import "./GameNameForm.css";
import Button from "@material-ui/core/Button"

export default function GameNameForm( props ) {
  const [gameName, setGameName] = useState("")
  const [colors, setColors] = useState([])
  const [color, setColor] = useState(0)
  const [points, setPoints] = useState(0)
  const [win, setWin] = useState('Never')

  const history =  useHistory ()

  useEffect(() => {
    axios.get(`/api/colors`)
    .then((response) => {
      setColors(response.data)
      setColor(response.data[0])
    })
  }, [])

  const submitHandler = function() {
    if (gameName) {
      props.createGame({ name: gameName, win_requirement: win === 'Never' ? null : win, win_points: points ? points : null }, { color: color.id }, history)
    }
  }

  const colorHandler = function(event) {
    for (const color of colors) if (color.name === event.target.value) setColor(color)
  }

  const winHandler = function(event) {
    setWin(event.target.value)
    if (event.target.value === 'Points') setPoints(1)
    else setPoints(0)
  }

  const pointsHandler = function(event) {
    if (event.target.value === 'Never') setPoints(0)
    else setPoints(event.target.value.split(' ')[0])
  }

  const winOptions = function() {
    const options = []
    options.push(<option key='0'>Never</option>)
    options.push(<option key='1'>Points</option>)
    options.push(<option key='2'>Tiles</option>)
    options.push(<option key='3'>Date</option>)
    return options
  }

  const pointOptions = function(value) {
    const options = []
    for(let i = 1; i <= value; i++) {
      options.push(<option key={i - 1}>{`${i} point${i === 1 ? '' : 's'}`}</option>)
    }
    return options
  }

  return (
    <div className= "form-page">

      <div className="game-name-form">

        <div>
          <img src = "Lightbulb_Icon.png" alt="lightbulb" className="lightbulb" />
          <hr />
          <p className="card-title">Create A Game </p>
          <hr />
          <TextField id="standard-basic" label="Game Name" type="text"  name="title" value={gameName} onChange={(event) => setGameName(event.target.value)}/>
          <br/>
        </div>

        <div className="game-options">
          <div>
            <label htmlFor="player-color">Choose a Color: </label>
              <select onChange={colorHandler} name="colors">
                {colors.map ((color, index) =>{
                return <option key={index}>{color.name}</option>
                })}
              </select>
            </div>
          <Token color={color.hexcode} />
        </div>


        <div className="game-options"> 
        <label htmlFor="win">Game Ends: </label>
          <select onChange={winHandler} name="win">
            {winOptions()}
          </select>
        </div>
          
        {win === 'Points' && (
          <Fragment>
            <label htmlFor="points">Points to Win: </label>
            <select onChange={pointsHandler} name="points">
                {pointOptions(20)}
            </select>
          </Fragment>
        
        )}
        

      <Button variant="outlined"  style={{ fontSize: '1em', fontWeight: 'bolder', margin: "10px" }} onClick={submitHandler}>Submit</Button>
    </div>
    </div>
  )
}