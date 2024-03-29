import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useVisualMode from "../hooks/useVisualMode";

import Token from "./token";
import Notification from "./notification";

import "./cornerTile.css";

export default function Corner(props) {
    
  const { mode, notify, cancel } = useVisualMode(
    props.occupied === props.pos ? "occupied" : "empty"
  );

  useEffect(() => {
    const player = props.players[props.currentPlayer]
    if (!props.game.ended_at && props.passGo && props.players.length > 0 && props.pos === player.player.position && (player.player.moving || player.player.done)) {
      props.passGo(props.currentPlayer)
    }
  }, [props.players[props.currentPlayer] ? props.players[props.currentPlayer].player.position : []])

  const activePlayers = function() {
    return props.players.map((player) => {
      if (props.pos === player.player.position) {
        return <Token key={player.player.id} color={player.color.hexcode} />
      }
      else return null
    })
  }

  const removeNotify = () => {
    cancel();
  }
  
  let tileStyle;
  if (props.id === "Corner4") {
    tileStyle = (
      <div className="corner" onClick={removeNotify}>
        <div className="corner-style-container">
          <div className="players-container">
            {activePlayers()}
          </div>
          <div>
            <img src={window.location.origin + '/Go_Text.png'} alt="MonopoRead Go" className="go-text" />
            </div>
            { mode === "occupied" && (<Notification type="corner-click-view" />) }
            { mode === "empty" }
            <div>
            <img src={window.location.origin + '/Monopoly_Go_Arrow.png'} alt="MonopoRead Arrow" className="arrow" />
          </div>
        </div>

      </div>
  )
  } else if (props.id === "Corner1") {
    tileStyle = (
      <div className="corner-flipped" onClick={removeNotify}>
        <div className="corner-style-container-flipped">
          <div className="players-container">
            {activePlayers()}
          </div>
          <img src={window.location.origin + '/Go_Text.png'} alt="MonopoRead Go" className="go-text-flipped" />
          { mode === "occupied" && (<Notification type="corner-flipped-click-view" />) }
          { mode === "empty" }
          <img src={window.location.origin + '/Monopoly_Go_Arrow.png'} alt="MonopoRead Arrow" className="arrow-flipped" />
        </div>
      </div>
    )
  } else if (props.id === "Corner3") {
    tileStyle = (
      <div className="corner" onClick={removeNotify}>
        <div className="players-container">
          {activePlayers()}
        </div>
        { mode === "occupied" && (<Notification type="central-station-click-view" />) }
        { mode === "empty" }
        <img src={window.location.origin + '/central-station.png'} alt="Railroad 1" className="Corner3" />
      </div>
    )
  } else {
    tileStyle = (
      <div className='corner' onClick={removeNotify}>
        <div className="players-container">
          {activePlayers()}
        </div>
        { mode === "occupied" && (<Notification type="reading-railroad-click-view" />) }
        { mode === "empty" }
        <img src={window.location.origin + '/reading-railroad.png'} alt="Railroad 2" className="Corner2"/>
      </div>
    )
  }

  return (
    <Link className={props.game.ended_at ? 'disabled-link' : 'link'} to={`/board/corner/${props.id}`}>
      {tileStyle}
    </Link>
    )
}