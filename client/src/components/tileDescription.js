import React, { useState } from "react";
import Review from "./review.js"
// import "./tileDescription.css"

export default function Description( props ) {

  const [reviewIsShown, setReviewIsShown] = useState(false); 

  return (
    <div>
    <h3> {props.description}</h3>
    <div className="submitted-books">
      <h2> {props.books[0] && props.books.length > 0 ? "What others have read:" : ''}</h2>
      {props.books.map((book, index) => <h3 key={index} onMouseEnter={() =>setReviewIsShown(true)} onMouseLeave={() => setReviewIsShown(false)}>{book}</h3> )}
      {reviewIsShown && (
        <Review></Review>
      )}
    </div>
    <h2> We Recommend: </h2>
    <h3> {props.firstbookrec} </h3>
    <h3> {props.secondbookrec} </h3>
    <h3> {props.thirdbookrec} </h3>
    </div>
  )
}
