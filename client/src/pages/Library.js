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
    return <Book key={book._id}
                 cover={book.image.thumbnail.url}
                 title={book.title} 
                 author={book.author} 
                 id={book._id} 
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
      filtered = this.state.books.filter((component) => component._id !== id)
      this.setState({books: filtered})
    } else {
      filtered = this.state.searchBooks.filter((component) => component._id !== id)
      this.setState({searchBooks: filtered})
    }
   
  }

  toggleTemplate = () => {
    const toggle = this.state.displayTemplate ? false : true
    this.setState({displayTemplate: toggle})
  }

  toggleSearchMode = (searchValue) => {
    const toggle = this.state.searchMode ? false : true
    if (searchValue.length > 0) {
      this.setState({searchMode: toggle})
    }
  }

  addToBooksArray = (title, author, cover, id) => {
    const book = {
      author: author,
      image: {thumbnail: {url: cover}},
      _id: id,
      title: title
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
      arr.push(id[i]._id)
    }

    let searchedBooks = books.filter((booksValue) => arr.indexOf(booksValue._id) !== -1)

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
        <Header toggleTemplate={this.toggleTemplate} toggleSearch={this.toggleSearchMode} filter={this.filter}/>
        <div className='book-wrapper'>
          {this.getBookTemplate()}
          {this.displayAllBooks()}
        </div>
      </div>
    )
  }
}

