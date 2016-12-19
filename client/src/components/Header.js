import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='text-field'>
          <h1 className='header-text'>Librarify</h1>
        </div>
        <div className='action-field'>
          <div className='search-book'></div> 
          <div className='add-book'></div> 
        </div>
      </div>
    )
  }
}

