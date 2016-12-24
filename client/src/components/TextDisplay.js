import React, { Component } from 'react'

export default class TextDisplay extends Component {
  getText() {
    return this.props.editable ? <input className='editable-text' defaultValue={this.props.text} onChange={this.changeText} /> : <h1 className="text-year">{this.props.text}</h1> 
  }

  changeText = (e) => {
    this.props.store(e.target.value)
  }

  render() {
    return (
      this.getText()
    )
  }
}