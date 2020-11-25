import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import HiddenChance from "./hiddenChance";
import './chanceInfo.css';

export default function CardInfo({data}, props) {

  const {cardId} = useParams();

  if (cardId === 0) {
    return <HiddenChance />
  }

  const card = data.card;

  let cardData; 

  if (card) {
    cardData = (
      <div className="indvidual-card" >
        <div className="individual-card-header">
        <h1> {card.name}</h1>
        </div>
        <div className="individual-card-body">
        <h3> {card.description}</h3>
        <h3 className="outcome"> {card.outcome} {card.effect}</h3>
        </div>
      </div>
    )
  } else {
    cardData = <HiddenChance />
  }

  return (
    <div>
      {cardData}
    </div>
  )
}