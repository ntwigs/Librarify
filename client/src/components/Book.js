import React, { Component } from 'react'
import DisplayBook from './DisplayBook'

export default class Book extends Component {
  render() {
    return (
      <DisplayBook cover={this.props.cover}/> //Url
    )
  }
}

