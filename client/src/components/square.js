import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Token from "./token";

export default function Square(props) {
  let type = "square " + props.direction + "-square";
  let textType = "square-text-" + props.direction;
  let active = "";
  if (props.direction === 'right') {
    active = "active-square";
  }

  let view = "click-view";
  if (props.direction === 'right' || props.direction === 'top') {
    view += '-v2';
  } if (props.direction === 'bottom') {
    view += '-v3';
  }

  let text = props.name;
  if (text && text.length > 13) {
    text.replace(/(.{12})/g, "\n");
  }

  //if props.player is true render the token component in the square component
  const activePlayers = function() {
    return props.players.map((player) => {
      if (props.pos === player.player.position) return <Token key={player.player.id} color={player.color.hexcode} />
      else return null
    })
  }
  
  return (
    <Link to = {`/tiles/${props.id}`}>
      <div className={type}>
        <div className={textType}>
          <div className="link-text">
            <h4>{text}</h4>
          </div>
          <div className={view}>
            <div className="hidden">View</div>
          </div>
        </div>
        <div className={active}>
          {activePlayers()}
        </div>
      </div>
    </Link>
  )
}

