import React, { Component } from 'react'
import magnifier from './BookIcons/search.svg'
import './Header.css'

export default class Search extends Component {
  displaySearch = () => {
    console.log('omg')
  }  

  getAddIcon = () => {
    return {
      backgroundImage: `url(${magnifier})`
    }
  }

  render() {
    return (
        <div className='search-book' onClick={this.displaySearch} style={this.getAddIcon()}></div>
    )
  }
} 