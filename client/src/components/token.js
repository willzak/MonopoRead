import React from "react";
import "./token.css"

export default function Token(props) {
  return (
    <div className="small-token" style={{ borderColor: props.color }}>
    </div>
  )
}