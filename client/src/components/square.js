import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

export default function Square(props) {
  let type = "square " + props.direction + "-square";
  let textType = "square-text-" + props.direction;

  let text = props.name;
  if (text && text.length > 13) {
    text.replace(/(.{12})/g, "\n");
  }

  return (
    <div className={type}>
      <div className={textType}>
        <Link to = {`/tiles/${props.id}`}>
        <h4>{text}</h4>
        </Link>
      </div>
    </div>
  )
}