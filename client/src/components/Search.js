import React, { Component } from 'react'
import magnifier from './BookIcons/search.svg'
import io from 'socket.io-client'
import './Header.css'
const socket = io('http://localhost:8000/')


export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      input: false,
      text: ''
    }
  }

  componentDidMount() {
    socket.on('result', (value) => {
      this.props.filter(value)
    })
  }

  getAddIcon = () => {
    return {
      backgroundImage: `url(${magnifier})`
    }
  }

  inputToggle = () => {
    const toggle = this.state.input ? false : true
    toggle ? socket.emit('openDB') : socket.emit('closeDB')
    this.setState({input: toggle})
    this.props.toggleSearch(this.state.text)
  }

  getInput() {
    return this.state.input ? <input defaultValue={this.state.text} className='searchbar' type='text' onChange={this.sendInput}></input> : null
  }

  sendInput = (e) => {
    this.setState({text: e.target.value})
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