import React, { Component } from 'react'
import cog from './BookIcons/cog.svg'
import edit from './BookIcons/edit.svg'
import clear from './BookIcons/clear.svg'

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
    return this.state.options ? 'display' : null
  }

  delete = () => {
    fetch('http://localhost:8000/delete/' + this.props.id)
    .then(r => this.deleteFromClient())
  }

  deleteFromClient() {
    this.props.remove(this.props.id)
  }

  getSpin = () => {
    return this.state.options ? 'spin' : null
  }

  getSettingsStyle = () => {
    return {
      backgroundImage: `url(${cog})`
    }
  }

  getEditStyle = () => {
    return {
      backgroundImage: `url(${edit})`
    }
  }

  getClearStyle = () => {
    return {
      backgroundImage: `url(${clear})`
    }
  }

  render() {
    return (
      <div className='options-container'>
        <div className={'edit settings ' + this.getSpin()} onClick={this.showOptions} style={this.getSettingsStyle()}></div>
        <div className={'delete edit ' + this.getEdit() } onClick={this.props.edit} style={this.getEditStyle()}></div>
        <div className={'delete edit ' + this.getEdit() } onClick={this.delete} style={this.getClearStyle()}></div>
      </div>
    )
  }
}

