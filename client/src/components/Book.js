import React, { Component } from 'react'

export default class Book extends Component {
  render() {
    return (
      <div className="cube-container">
        <div className="origo"></div>
        <div className="cube">
          <div className="front">1</div>
          <div className="back">2</div>
          <div className="right">3</div>
          <div className="left">4</div>
          <div className="top">5</div>
          <div className="bottom">6</div>
        </div>
      </div>
    )
  }
}

