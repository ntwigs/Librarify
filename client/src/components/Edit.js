import React, { Component } from 'react'

export default class Edit extends Component {
  constructor() {
    super()
    this.state = {
      options: false
    }
  }

  showOptions = () => {
    const options = this.state.options ? false : true
    this.setState({options: options})
  }

  getEdit() {
    return this.state.options ? <div className='delete edit' onClick={this.props.edit}>e</div> : null
  }

  getDelete() {
    return this.state.options ? <div className='delete edit' onClick={this.delete}>d</div> : null
  }

  delete = () => {
    fetch('http://localhost:8000/delete/' + this.props.id)
    .then(r => this.deleteFromClient())
  }

  deleteFromClient() {
    this.props.remove(this.props.id)
  }

  render() {
    return (
      <div className='options-container'>
        <div className='edit' onClick={this.showOptions}>+</div>
        {this.getDelete()}
        {this.getEdit()}
      </div>
    )
  }
}

