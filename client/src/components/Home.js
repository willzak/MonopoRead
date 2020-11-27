import React from "react"
import { Link } from "react-router-dom";

export default function Home( props ) {
  return (
    <div>
      <h1> Home Page </h1>
      <Link to = {`/board/`}>
        <h1>Play Game</h1>
      </Link> 
    </div>
  )
}