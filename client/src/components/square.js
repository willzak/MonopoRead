import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Token from "./token";




export default function Square(props) {
  let type = "square " + props.direction + "-square";
  let textType = "square-text-" + props.direction;

  let view = "click-view";
  if (props.direction === 'right' || props.direction === 'top') {
    view += '-v2';
  } if (props.direction === 'bottom') {
    view += '-v3';
  }

  let text = props.tile ? props.tile.name : "";
  if (text && text.length > 13) {
    text.replace(/(.{12})/g, "\n");
  }

  let submit = false; 

  //if props.player is true render the token component in the square component
  const activePlayers = function() {
    submit = false; 
    const players =  props.players.map((player, index) => {
      
      if (props.pos === player.player.position) {
        if (props.currentPlayer === index) submit = true; 
        return <Token key={player.player.id} color={player.color.hexcode} />
      } 
      else return null
      })
      return players; 
  }
  
  const active = activePlayers()
  
  return (

    <Link to = {`/tiles/${props.tile ? props.tile.id : 0}${submit ? '/submit' : ''}`}>
      <div className={type}>
        <div className={textType}>
          <div className="link-text">
            <h4>{text}</h4>
          </div>
          <div className={view}>
            <div className="hidden">View</div>
          </div>
        </div>
        {active}
      </div>
    </Link> 
  )
}

