import React, { Component } from 'react'
import Book from './Book'

export default class BookTemplate extends Component {
  render() {
    return (
      <Book new={true} remove={this.props.remove} />
    )
  }
}

