import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Token from "./token";


//I think I have to do something like UseVisualMode here: 
// if props.player is null = empty mode (just the square)
//if props.player is true = show mode (square with token) 


export default function Square(props) {
  let type = "square " + props.direction + "-square";
  
  //if props.player is true render the token component in the square component
  const playerActive = props.player ? <Token /> : null
  
  return (
    <div class={type}>
       <Link to = {`/tiles/${props.id}`}>
      <h4>{props.name}</h4>
      </Link>
      {playerActive}
    </div>
  )
}

