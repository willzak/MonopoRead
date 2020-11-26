import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TileInfo from "./tileInfo.js";
import ChanceInfo from "./chanceInfo";

export default function Console(props) {
<<<<<<< HEAD
  const tileData = [
    {
      id: 1,
      name: "Read A Poetry Book",
      colour: "pink",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.",
        recommendation: ["BookA", "BookB", "BookC"]
    },
    {
      id: 2,
      name: "Read A Sci-Fi Book",
      colour: "pink",
      description:
        "Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.",
      recommendation: ["Book1", "Book2", "Book3"]
    },
    {
      id: 3,
      colour: "orange",
      name: "Read A Horror Book",
      description:
        "Bloop Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.",
      recommendation: ["BookI", "BookII", "BookIII"]
    },
    {
      id: 4,
      colour: "orange",
      name: "Read A Fantasy Book",
      description:
        "Blah Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.",
      recommendation: ["BookD", "BookE", "BookF"]
    },
  ];

  const chanceData = [{
    id: 1,
    name: "name",
    description: "desc",
    effect: "points",
    outcome: 2
  }];

  return (
    <div className="console">
       <Route path="/tiles/:tileId"><TileInfo data={props.tiles.length > 0 ? props.tiles : tileData} /></Route>
       <Route path="/cards/:cardId"><ChanceInfo data={props.chance.card ? props.chance : chanceData} /></Route>
=======
  return (
    <div className="console">
      <Route exact path="/"></Route>
        <Route exact path="/tiles/:tileId/submit">
          <TileInfo saveBook={props.saveBook} data={props.tiles} submit={true} currentPlayer={props.currentPlayer} players={props.players} board={props.board}  />
        </Route>
       <Route exact path="/tiles/:tileId">
          <TileInfo data={props.tiles} submit={false} />
        </Route>

>>>>>>> 0cbea671a24151838fa4c7c53e85c03618011cc1
    </div>
  )
}