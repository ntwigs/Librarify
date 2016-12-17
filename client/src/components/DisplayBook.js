import React, { Component } from 'react'
import './DisplayBook.css'

export default class DisplayBook extends Component {
  render() {
    return (
      <div className="cube-container">
        <div className="origo"></div>
        <div className="cube">
          <div className="front"></div>
          <div className="back"></div>
          <div className="right"></div>
          <div className="left"></div>
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
      </div>
    )
  }
}

