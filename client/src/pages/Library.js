import React, { Component } from 'react'
import Book from '../components/Book'

export default class Library extends Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    fetch('http://localhost:8000/')
    .then(books => books.json())
    .then(jBooks => {
      this.setState({
        books: jBooks
      })
    })
  }

  displayAllBooks() {
    let bookArray = []
    for (let i = 0; i < this.state.books.length; i++) {
      bookArray.push(
        <Book key={i} 
              cover={this.state.books[i].book_cover}
              title={this.state.books[i].book_name}
              author={this.state.books[i].book_author}
        />
      )
    }
    return bookArray
  }


  render() {
    return (
      <div className='wrapper'>
        {this.displayAllBooks()}
      </div>
    )
  }
}

