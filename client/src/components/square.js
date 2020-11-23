import React from "react";

export default function Square(props) {
  let type = "square " + props.direction + "-square";

  return (
    <div class={type}></div>
  )
}