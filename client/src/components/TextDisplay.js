import React, { Component } from 'react'

export default class TextDisplay extends Component {
  getText() {
    return this.props.editable ? <input className='editable-text' defaultValue={this.props.text} onChange={this.changeText} /> : <h1 className="text-year">{this.props.text}</h1> 
  }

  changeText = (e) => {
    this.props.store(e.target.value, this.props.id)
  }

  getDelete() {
    return this.props.id > 0 && this.props.editable ? <div className='delete-author' onClick={this.delete}></div> : null
  }

  delete = () => {
    this.props.delete(this.props.id)
  }

  render() {
    return (
      <div className='author-input'>
        {this.getText()}
        {this.getDelete()}
      </div>
    )
  }
}