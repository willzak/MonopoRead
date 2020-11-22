import React from "react";

import Board from "./gameBoard";

export default function Game(props) {
  return (
    <body class="game-view">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div class="side-bar">
        Side Bar
      </div>
      <div class="game-play">
        <Board />
      </div>
    </body>
  )
}