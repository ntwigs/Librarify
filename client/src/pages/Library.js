import React, { Component } from 'react'
import Book from '../components/Book'
import Header from '../components/Header'

export default class Library extends Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentWillMount() {
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
              author={this.state.books[i].author_name}
              id={this.state.books[i].book_id}
              remove={this.removeBookFromArray}
        />
      )
    }
    return bookArray
  }

  removeBookFromArray = (id) => {
    const filtered = this.state.books.filter((component) => component.book_id !== id)
    this.setState({
      books: filtered
    })
  }


  render() {
    return (
      <div className='wrapper'>
        <Header />
        <div className='book-wrapper'>
          {this.displayAllBooks()}
        </div>
      </div>
    )
  }
}

