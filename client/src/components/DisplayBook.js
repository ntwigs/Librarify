import React, { Component } from 'react'
import './DisplayBook.css'

export default class DisplayBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: -13,
      y: 27
    }
  }

  move = (e) => {
    const x = (e.nativeEvent.offsetY - 100) / 3.6
    const y = (e.nativeEvent.offsetX - 100) / 3.6

    this.setState({
      x: x,
      y: y
    })
  }

  getPosition() {
    const y = this.state.y
    const x = -this.state.x

    return {
      transform: `translateZ(-1000px) rotateY(${y}deg) rotateX(${x}deg)`
    }
  }

  getCoverImage() {
    return {
      backgroundImage: `url(${this.props.cover})`
    }
  }
  
  render() {
    return (
      <div onMouseMove={this.move} className="cube-container">
        <div className="cube" style={this.getPosition()}>
          <div className="front" style={this.getCoverImage()}></div>
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

