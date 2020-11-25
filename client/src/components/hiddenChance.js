import React from "react";

import "./hiddenChance.css";

export default function HiddenChance(props) {
  return (
    <div className="hidden-card" >
      <div className="hidden-card-header">
        <h1>?</h1>
      </div>
      <div className="hidden-card-body">
        <h3>Chance</h3>
      </div>
    </div>
  )
}