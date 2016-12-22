import React, { Component } from 'react'
import BookTemplate from './../components/BookTemplate'
import Book from '../components/Book'
import Header from '../components/Header'

export default class Library extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      searchBooks: [],
      searchMode: false,
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

  createBook(index, search = false) {
    let book = search ? this.state.searchBooks[index] : this.state.books[index]

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
    const bookLength = this.state.searchMode ? this.state.searchBooks.length : this.state.books.length

    for (let i = 0; i < bookLength; i++) {
      bookArray.push(
         this.createBook(i, this.state.searchMode)
      )
    }
    return bookArray.reverse()
  }

  removeBookFromArray = (id) => {
    let filtered

    if (!this.state.searchMode) {
      filtered = this.state.books.filter((component) => component.book_id !== id)
      this.setState({books: filtered})
    } else {
      filtered = this.state.searchBooks.filter((component) => component.book_id !== id)
      this.setState({searchBooks: filtered})
    }
   
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

    this.setState({
      books: [...this.state.books, book]
    })

    this.toggleTemplate()

  }

  getBookTemplate() {
    return this.state.displayTemplate ? <BookTemplate remove={this.removeBookFromArray} addBook={this.addToBooksArray}/> : null
  }

  filter = (id) => {
    const books = this.state.books
    let searchMode = true

    let arr = []
    for (let i = 0; i < id.length; i++) {
      arr.push(id[i].book_id)
    }

    let searchedBooks = books.filter((booksValue) => arr.indexOf(booksValue.book_id) !== -1)

    if (this.state.books.length === searchedBooks.length) {
      searchMode = false
    }

    this.setState({
      searchBooks: searchedBooks,
      searchMode: searchMode
    })

  }

  render() {
    return (
      <div className='wrapper'>
        <Header toggleTemplate={this.toggleTemplate} filter={this.filter}/>
        <div className='book-wrapper'>
          {this.getBookTemplate()}
          {this.displayAllBooks()}
        </div>
      </div>
    )
  }
}

