import React from "react";
import { FixedSizeList as List } from 'react-window';
import "./tileDescription.css"

export default function Description( props ) {

  const onMouseEnter = (review) => {
    props.setReview(review)
    if (review) props.setShowReview(true)
  }

  const submittedBooks = ({ index, style }) => (
    <h3 style={style} key={index} onMouseEnter={() => onMouseEnter(props.books[index].review)} onMouseLeave={() => props.setShowReview(false)}>{props.books[index].name}</h3>
  );

  return (props.congrats ?
    (<div>
      <h3>Congratulations! You read:</h3>
      <h3>{props.congrats}</h3>
    </div>) :
    (<div>
    <h3> {props.description}</h3>
    <div className="submitted-books">
      <h2 style={{marginBottom: '0'}}> {props.books[0] ? "What others have read:" : ''}</h2>
      {props.books[0] && props.books.length > 5 ? (
        <List className='no-scrollbars'
          height={100}
          itemCount={props.books.length}
          itemSize={20}
          width={'100%'}
        >
          {submittedBooks}
        </List>
      ) : (props.books.map((book, index) => <h3 key={index} onMouseEnter={() => onMouseEnter(book.review)} onMouseLeave={() => props.setShowReview(false)}>{book.name}</h3>))}
    </div>
    <h2> We Recommend: </h2>
    <h3> {props.firstbookrec} </h3>
    <h3> {props.secondbookrec} </h3>
    <h3> {props.thirdbookrec} </h3>
    </div>)
  )
}
