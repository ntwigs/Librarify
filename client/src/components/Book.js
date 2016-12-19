import React, { Component } from 'react'
import DisplayBook from './DisplayBook'
import Save from './Save'
import TextDisplay from './TextDisplay'
import Edit from './Edit'
import './DisplayBook.css'

export default class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      author: this.props.author,
      newTitle: '',
      newAuthor: '',
      edit: false
    }
  }

  enableEdit = () => {
    const edit = this.state.edit ? false : true
    this.setState({edit: edit})
  }

  setNewTitle = (title) => {
    this.setState({newTitle: title})
  }

  setNewAuthor = (author) => {
    this.setState({newAuthor: author})
  }

  getChanges = () => {
    const newTitle = this.state.newTitle !== '' ? this.state.newTitle : this.state.title 
    const newAuthor = this.state.newAuthor !== '' ? this.state.newAuthor : this.state.author
    return {title: newTitle, author: newAuthor}
  }

  saveChanges = () => {
    const changes = this.getChanges()
    this.setState({title: changes.title, author: changes.author})
  }

  render() {
    return (
      <div className="container">
        <div className="header-image">
          <Edit id={this.props.id} remove={this.props.remove} edit={this.enableEdit}/>
          <DisplayBook cover={this.props.cover}/>
        </div>
        <div className="body">
          <div className="info">
            <div className="title section">
              <h5 className="cat-title">TITLE</h5>
              <TextDisplay text={this.state.title} editable={this.state.edit} store={this.setNewTitle} />
            </div>
            <div className="seperator"></div>
            <div className="author section">
              <h5 className="cat-author">AUTHOR</h5>
              <TextDisplay text={this.state.author} editable={this.state.edit} store={this.setNewAuthor}/>
            </div>
            <div className="seperator"></div>
            <div className="year section">
              <h5 className="cat-year">YEAR</h5>
              <TextDisplay text={'1866'} />
            </div>
          </div>
          <div className="footer">
            <Save display={this.state.edit} edit={this.enableEdit} save={this.saveChanges} id={this.props.id} changes={this.getChanges}/>
          </div>
        </div>
      </div>
    )
  }
}