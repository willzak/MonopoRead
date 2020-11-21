import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  fetchData = () => {
    axios.get('/api/books') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      this.setState({
        books: response.data.books.map(book => {
          return (
            <section>
              <h1>ID: {book.id}</h1>
              <h1>Name: {book.name}</h1>
              <h1>Author: {book.author}</h1>
            </section>
          )
        })
      });
    }) 
  }

  render() {
    return (
      <div className="App">
        { this.state.books }
        <button onClick={this.fetchData} >
          Fetch Data
        </button>        
      </div>
    );
  }
}

export default App;
