import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Token from "./token";
import axios from 'axios';
import useVisualMode from "../hooks/useVisualMode";



export default function Square(props) {
  const [submit, setSubmit] = useState(false)
  const [active, setActive] = useState([])

  let type = "square " + props.direction + "-square";
  let textType = "square-text-" + props.direction;
  let position;
  let view = "click-view";
  const player = props.players[props.currentPlayer];

  const { mode, notify, cancel } = useVisualMode(
    props.occupied === props.pos ? "occupied" : "empty"
  );

  if (props.direction === 'right') {
    view += '-v2';
    position = "active-square-right";
  } else if (props.direction === 'top') {
    view += '-v2';
    position = "active-square-top";
  } else if (props.direction === 'bottom') {
    view += '-v3';
    position = "active-square-bottom";
  } else if (props.direction === 'left') {
    position = "active-square-left";
  }

  let text = props.tile ? props.tile.name : "";
  if (text && text.length > 13) {
    text.replace(/(.{12})/g, "\n");
  }

  //if props.player is true render the token component in the square component
  const activePlayers = function() {
    setSubmit(false); 
    return props.players.map((player, index) => {
      if (props.pos === player.player.position) {
        if (props.currentPlayer === index && props.tile) {
          axios.get(`/api/boards/${props.board}/players/${player.player.id}/open_tile/${props.tile.board_tile_id}`)
          .then((response) => {
            if (response.data) setSubmit(true); 
          })
        }  
        return <Token key={player.player.id} color={player.color.hexcode} />
      } 
      else return null
      })
  }

  useEffect(() => {
    setActive(activePlayers())
    for (const player of props.players) {
      if (props.pos === player.player.position && player.player.done) {
        props.landTile(props.currentPlayer, props.tile)
      }
    }
  }, [props.players, props.tile, props.currentPlayer])
  
  return (

    <Link to = {`/board/tiles/${props.tile ? props.tile.id : 0}${submit ? '/submit' : ''}`}>
      <div className={type} onClick={cancel}>
        <div className={textType}>
          <div className="link-text">
            <h4>{text}</h4>
          </div>
          { mode === "empty" && (
            <div className={view}>
              <div className="hidden">View</div>
            </div>)}
          { mode === "occupied" && (
            <div className={view}>
              <div className="hidden">Click Me!</div>
            </div>)}
        </div>
        <div className={position}>
          {active}
        </div>
      </div>
    </Link> 
  )
}