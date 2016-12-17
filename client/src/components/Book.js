import React, { Component } from 'react'
import DisplayBook from './DisplayBook'
import './DisplayBook.css'

export default class Book extends Component {
  render() {
    return (
      <div className="container">
        <div className="header-image">
          <DisplayBook cover={this.props.cover}/>
        </div>
        <div className="body">
          <div className="info">
            <div className="title section">
              <h5 className="cat-title">TITLE</h5>
              <h1 className="text-title">{this.props.title}</h1>
            </div>
            <div className="seperator"></div>
            <div className="author section">
              <h5 className="cat-author">AUTHOR</h5>
              <h1 className="text-author">{this.props.author}</h1>
            </div>
            <div className="seperator"></div>
            <div className="year section">
              <h5 className="cat-year">YEAR</h5>
              <h1 className="text-year">1866</h1>
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    )
  }
}

