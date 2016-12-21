import React, { Component } from 'react'
import add from './BookIcons/clear.svg'
import './Header.css'

export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayTemplate: false
    }
  }

  setTemplate = () => {
    this.props.toggle()
  }

  getAddIcon = () => {
    return {
      backgroundImage: `url(${add})`
    }
  }

  render() {
    return (
      <div className='add-book' onClick={this.setTemplate} style={this.getAddIcon()}></div>
    )
  }
}

