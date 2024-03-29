import React from "react";
import { FixedSizeList as List } from 'react-window';
import "./tileDescription.css"; 
import Confetti from 'react-confetti';

export default function Description( props ) {

  const onMouseEnter = (text, name) => {
    props.setReview({text: text, name: name})
    if (text && name) props.setShowReview(true)
  }

  const submittedBooks = ({ index, style }) => (
    <div style={style}>
      <h3 style={{color: props.books[index].color}} key={index} onMouseEnter={() => onMouseEnter(props.books[index].review, props.books[index].user)} onMouseLeave={() => props.setShowReview(false)}>{props.books[index].name}</h3>
    </div>
  );

  return (props.congrats ?
    (<div>
      <div className="individual-congrats-header">
        <Confetti />
        <h1>Congratulations</h1>
      </div>
      <div className="individual-card-body">
        <h3>You read {props.congrats}</h3>
        <h3 className="outcome">+3 Points</h3>
      </div>
      </div>) :
    (<div className="outer-body">
    <h3 className="book-description"> {props.description}</h3>
    
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
      ) : (props.books.map((book, index) => <h3 style={{color: props.books[index].color}} key={index} onMouseEnter={() => onMouseEnter(props.books[index].review, props.books[index].user)} onMouseLeave={() => props.setShowReview(false)}>{book.name}</h3>))}
    </div>
    
    <div>
    <h2> We Recommend: </h2>
      <ul className ="book-rec-list" >
      <li className="indv-book-recs">{props.firstbookrec} </li>
      <li className="indv-book-recs">{props.secondbookrec} </li>
      <li className="indv-book-recs">{props.thirdbookrec} </li>
      </ul>
    </div>
  </div>)
  )
}
