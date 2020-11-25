import React, { useState } from "react";
// import './bookForm.css'


export default function Form( props ) {
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  
  const save = () => {
    console.log ("this has saved as", title)
    console.log("this review is", review)
  }
  
  return (
    <div>
        <form className="book-form">
        <h3>Book Title(ISBN??)</h3>
          <input type="text"  name="title" value={title} onChange={(event) => setTitle(event.target.value)}/>
   
        <h3>Leave a Review (optional)</h3>
          <input type="text" name="review" value={review} onChange={(event) => setReview(event.target.value)}/>
        
        </form>
        <button onClick={save}>Submit!</button>
    </div>
    )
};