import React from "react";

export default function Colour(props) {
  let type = "colour " + props.colour;

  return (
    <div className={type}></div>
  )
}