import React, { Component } from 'react'
import DisplayBook from './DisplayBook'
import TextDisplay from './TextDisplay'
import Edit from './Edit'
import './DisplayBook.css'

export default class Book extends Component {
  render() {
    return (
      <div className="container">
        <div className="header-image">
          <Edit id={this.props.id} />
          <DisplayBook cover={this.props.cover}/>
        </div>
        <div className="body">
          <div className="info">
            <div className="title section">
              <h5 className="cat-title">TITLE</h5>
              <TextDisplay text={this.props.title} />
            </div>
            <div className="seperator"></div>
            <div className="author section">
              <h5 className="cat-author">AUTHOR</h5>
              <TextDisplay text={this.props.author} />
            </div>
            <div className="seperator"></div>
            <div className="year section">
              <h5 className="cat-year">YEAR</h5>
              <TextDisplay text={'1866'} />
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    )
  }
}

