import React, { Component } from 'react'

export default class TextDisplay extends Component {
  render() {
    return (
      <h1 className="text-year">{this.props.text}</h1>
    )
  }
}

