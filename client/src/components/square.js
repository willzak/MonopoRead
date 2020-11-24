import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

export default function Square(props) {
  let type = "square " + props.direction + "-square";
  let textType = "square-text-" + props.direction;

  let view = "click-view";
  if (props.direction === 'right' || props.direction === 'top') {
    view += '-v2';
  } if (props.direction === 'bottom') {
    view += '-v3';
  }

  let text = props.name;
  if (text && text.length > 13) {
    text.replace(/(.{12})/g, "\n");
  }

  return (
    <Link to = {`/tiles/${props.id}`}>
      <div className={type}>
        <div className={textType}>
          <div className="link-text">
            <h4>{text}</h4>
          </div>
          <div className={view}>
            <div className="hidden">View</div>
          </div>
        </div>
      </div>
    </Link>
  )
}