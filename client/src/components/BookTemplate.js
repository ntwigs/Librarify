import React, { Component } from 'react'
import Book from './Book'

export default class BookTemplate extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      cover: ''
    }
  }

  render() {
    return (
      <Book new={true} ref='book' remove={this.props.remove} addBook={this.props.addBook} />
    )
  }
}

