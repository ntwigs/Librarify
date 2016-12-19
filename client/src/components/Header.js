import React, { Component } from 'react'
import add from './BookIcons/clear.svg'
import './Header.css'

export default class Header extends Component {
  getAddIcon = () => {
    return {
      backgroundImage: `url(${add})`
    }
  }

  render() {
    return (
      <div className='header'>
        <div className='text-field'>
          <h1 className='header-text'>Librarify</h1>
        </div>
        <div className='action-field'>
          <div className='search-book'></div> 
          <div className='add-book' style={this.getAddIcon()}></div> 
        </div>
      </div>
    )
  }
}

