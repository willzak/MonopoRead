import React from "react"
import { Link } from "react-router-dom";

export default function Home( props ) {
  return (
    <div>
      <h1> Home Page </h1>
      <Link to = {`/board`}>
        <h3>Play Game</h3>
      </Link> 
      <Link to = {`/game/join`}>
        <h3>Join Game</h3>
      </Link> 
      <Link to = {`/game`}>
        <h3>Create Game</h3>
      </Link> 
    </div>
  )
}