import React from "react";

import './cornerTile.css';

export default function Notification(props) {

  return (
    <div className={props.type}>
      <div className="hidden">Click Me!</div>
    </div>
  )
}