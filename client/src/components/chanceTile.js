import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Token from './token'

export default function Chance(props) {

  let type = "tile chance chance";
  let text = "chance-icon-";
  let label = "label-";

  if (props.direction === 'left') {
    type += '-left';
    text += 'left';
    label += 'left';
  } else if (props.direction === 'right') {
    type += '-right';
    text += 'right';
    label += 'right';
  } else if (props.direction === 'top') {
    type += '-top';
    text += 'top';
    label += 'top';
  } else {
    type += '-bottom';
    text += 'bottom';
    label += 'bottom';
  }

  useEffect(() => {
    for (const player of props.players) {
      if (props.pos === player.player.position) {
        if (player.player.done) {
          props.drawChance(player.player.id)
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
    <Link to={`/cards/${id}`}>
      <div className={type}>
        <div className={text}>
          <strong>?</strong>
        </div>
        <div className={label}>
          Chance
        </div>
        {activePlayers()}
      </div>
    </Link>
  )
}