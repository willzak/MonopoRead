import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Token from './token';

import './chance.css';

export default function Chance(props) {

  let type = "chance chance";
  let text = "icon chance-icon-";
  let label = "label label-";
  let shadow;
  let tokenHolder;

  if (props.direction === 'left') {
    type += '-left';
    text += 'left';
    label += 'left';
    tokenHolder = "active-players-left";
  } else if (props.direction === 'right') {
    type += '-right';
    text += 'right';
    label += 'right';
    tokenHolder = "active-players-right";
  } else if (props.direction === 'top') {
    type += '-top';
    text += 'top';
    label += 'top';
    tokenHolder = "active-players-top";
  } else {
    type += '-bottom';
    text += 'bottom';
    label += 'bottom';
    tokenHolder = "active-players-bottom";
  }

  useEffect(() => {
    for (const player of props.players) {
      if (props.pos === player.player.position && player.player.done) {
        props.drawChance(props.currentPlayer)
        if (shadow !== "shadowBox" && !text.includes("rainbow")) {
          text += " rainbow rainbow_text_animated";
          shadow = "shadowBox";
        }
      }
    }
  }, [props.players])

  const activePlayers = function() {
    return props.players.map((player) => {
      if (props.pos === player.player.position) {
        return <Token key={player.player.id} color={player.color.hexcode} />
      }
      else return null
    })
  }

  let id;

  if (props.chance.card) {
    id = props.chance.card.id;
  } else {
    id = 0;
  }

  return (
    <Link className={props.game.ended_at ? 'disabled-link' : 'link'} to={`/board/cards/${id}`}>
      <div className="chance-container">
        <div className={type}>
          <div className={label}>
            Chance
          </div>
          <div className={text} id={shadow}>
            <strong>?</strong>
          </div>
        </div>
        <div className={tokenHolder}>
          {activePlayers()}
        </div>
      </div>
    </Link>
  )
}