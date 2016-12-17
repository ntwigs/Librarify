import React, { Component } from 'react'
import Book from '../components/Book'

export default class Library extends Component {
  getAllBooks() {
    fetch('http://localhost:8000/')
    .then(books => books.json())
    .then(res => console.log(res))
  }


  render() {
    this.getAllBooks()
    return (
      <div>
        <Book />
        <Book />
      </div>
    )
  }
}

