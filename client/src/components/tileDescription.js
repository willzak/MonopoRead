import React from "react";

export default function Description( props ) {
  return (
    <div>
    <h3> {props.description}</h3>
     
    <h2> {props.books.length > 0 ? "What others have read:" : ''}</h2>
    <h3> {props.books}</h3>
    <h2> We Recommend: </h2>
    <h3> {props.firstbookrec} </h3>
    <h3> {props.secondbookrec} </h3>
    <h3> {props.thirdbookrec} </h3>
    </div>
  )
}
