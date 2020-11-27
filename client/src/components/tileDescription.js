import React from "react";
// import "./tileDescription.css"

export default function Description( props ) {

  const onMouseEnter = (review) => {
    props.setReview(review)
    if (review) props.setShowReview(true)
  }


  return (
    <div>
    <h3> {props.description}</h3>
    <div className="submitted-books">
      <h2> {props.books[0] ? "What others have read:" : ''}</h2>
      {props.books.map((book, index) => <h3 key={index} onMouseEnter={() => onMouseEnter(book.review)} onMouseLeave={() => props.setShowReview(false)}>{book.name}</h3> )}
    </div>
    <h2> We Recommend: </h2>
    <h3> {props.firstbookrec} </h3>
    <h3> {props.secondbookrec} </h3>
    <h3> {props.thirdbookrec} </h3>
    </div>
  )
}
