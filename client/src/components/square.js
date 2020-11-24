import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

export default function Square(props) {
  let type = "square " + props.direction + "-square";
  let textType = "square-text-" + props.direction;

  let view = "click-view";
  if (props.direction === 'right' || props.direction === 'top') {
    view += '-v2';
  }

  let text = props.name;
  if (text && text.length > 13) {
    text.replace(/(.{12})/g, "\n");
  }

  return (
    <div className={type}>
      <Link to = {`/tiles/${props.id}`}>
        <div className={textType}>
          <div className="link-text">
            <h4>{text}</h4>
          </div>
          <div class={view}>
            <div class="hidden">View</div>
          </div>
        </div>
      </Link>
    </div>
  )
}