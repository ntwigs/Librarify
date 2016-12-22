import React, { Component } from 'react'
import magnifier from './BookIcons/search.svg'
import io from 'socket.io-client'
import './Header.css'
const socket = io('http://localhost:8000/')


export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      input: false
    }
  }

  getAddIcon = () => {
    return {
      backgroundImage: `url(${magnifier})`
    }
  }

  inputToggle = () => {
    const toggle = this.state.input ? false : true
    this.setState({input: toggle})
  }

  getInput() {
    return this.state.input ? <input className='searchbar' type='text' onChange={this.sendInput}></input> : null
  }

  sendInput(e) {
    socket.emit('searching', e.target.value)
  }

  render() {
    return (
      <div className='search-container'>
        {this.getInput()}
        <div className='search-book' onClick={this.inputToggle} style={this.getAddIcon()}></div>
      </div>
    )
  }
} 