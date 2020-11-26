import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Token from './token';

export default function Chance(props) {

  let type = "tile chance chance";
  let text = "icon chance-icon-";
  let label = "label label-";
  let view = "chance-click-view";
  let tokenHolder;


  if (props.direction === 'left') {
    type += '-left';
    text += 'left';
    label += 'left';
    view += '-left';
    tokenHolder = "active-players-left";
  } else if (props.direction === 'right') {
    type += '-right';
    text += 'right';
    label += 'right';
    view += '-right';
    tokenHolder = "active-players-right";
  } else if (props.direction === 'top') {
    type += '-top';
    text += 'top';
    label += 'top';
    view += '-top';
    tokenHolder = "active-players-top";
  } else {
    type += '-bottom';
    text += 'bottom';
    label += 'bottom';
    view += '-bottom';
    tokenHolder = "active-players-bottom";
  }

  useEffect(() => {
    for (const player of props.players) {
      if (props.pos === player.player.position && player.player.done) props.drawChance(props.currentPlayer)
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
    <Link to={`/cards/${id}`}>
      <div className="chance-container">
        <div className={type}>
          <div className={text}>
            <strong>?</strong>
          </div>
          <div className={label}>
            Chance
          </div>
        </div>
        <div className={view}>
          <div className="chance-hidden">View</div>
        </div>
        <div className={tokenHolder}>
          {activePlayers()}
        </div>
      </div>
    </Link>
  )
}