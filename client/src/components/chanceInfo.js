import React from "react";
import { useParams } from "react-router-dom";
import HiddenChance from "./hiddenChance";
import CancelIcon from '@material-ui/icons/Cancel';
import './chanceInfo.css';

export default function CardInfo({data}, props) {

  const {cardId} = useParams();

  if (cardId === 0) {
    return <HiddenChance />
  }
  
  const card = data.card;

  let cardData;

  let effect = "points";
  let type = "outcome "

  
  if (card) {
    if (card.outcome === 1 || card.outcome === -1) {
      effect = "point";
    }

    if (card.outcome < 0) {
      type += 'bad';
    }

    cardData = (
      <div className="individual-card" >
        <div className="individual-card-header">
          <h1> {card.name}</h1>
          <Link to="/" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
        <h3> {card.description}</h3>
        <h3 className={type}> {card.outcome} {effect}</h3>
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