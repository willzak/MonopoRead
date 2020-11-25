import React from "react";
// import './bookForm.css'


export default function Form( props ) {

  return (
    <div>
        <h3>Book Title(ISBN??)</h3>
        <form>
          <input type="text"/>
        </form>
        <h3>Leave a Review (optional)</h3>
        <form>
          <input type="text"/>
        </form>
        <button>Submit!</button>
    </div>
    )
};