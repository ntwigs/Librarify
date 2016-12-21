import React, { Component } from 'react'
import BookTemplate from './../components/BookTemplate'
import Book from '../components/Book'
import Header from '../components/Header'

export default class Library extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      displayTemplate: false
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

  createBook(index) {
    let book = this.state.books[index]

    return <Book key={book.book_id}
                 cover={book.book_cover}
                 title={book.book_name} 
                 author={book.author_name} 
                 id={book.book_id} 
                 remove={this.removeBookFromArray}
                 new={false} 
    />
  }

  displayAllBooks = () => {
    let bookArray = []

    for (let i = 0; i < this.state.books.length; i++) {
      bookArray.push(
        this.createBook(i)
      )
    }
    return bookArray.reverse()
  }

  removeBookFromArray = (id) => {
    const filtered = this.state.books.filter((component) => component.book_id !== id)
    
    this.setState({
      books: filtered
    })
  }

  toggleTemplate = () => {
    const toggle = this.state.displayTemplate ? false : true
    this.setState({displayTemplate: toggle})
  }

  addToBooksArray = (title, author, cover, id) => {
    const book = {
      author_name: author,
      book_cover: cover,
      book_id: id,
      book_name: title
    }

    console.log(this.state.books)

    this.setState({
      books: [...this.state.books, book]
    })

    this.toggleTemplate()

  }

  getBookTemplate() {
    return this.state.displayTemplate ? <BookTemplate remove={this.removeBookFromArray} addBook={this.addToBooksArray}/> : null
  }

  render() {
    return (
      <div className='wrapper'>
        <Header toggleTemplate={this.toggleTemplate} />
        <div className='book-wrapper'>
          {this.getBookTemplate()}
          {this.displayAllBooks()}
        </div>
      </div>
    )
  }
}

