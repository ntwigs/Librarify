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
      cover: this.props.cover,
      newTitle: '',
      newAuthor: '',
      edit: this.props.new,
      id: this.props.id
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

  changeId = (id) => {
    this.setState({id: id})
  }

  changeCover = (coverLink) => {
    this.setState({cover: coverLink})
  }

  bookingsYes = () => {
    const title = this.state.title
    const author = this.state.author
    const cover = this.state.cover
    const id = this.state.id

    this.props.addBook(title, author, cover, id)
  }

  render() {
    return (
      <div className="container" data-id={this.state.id} data-oldId={this.state.id}>
        <div className="header-image">
          <Edit id={this.state.id} remove={this.props.remove} edit={this.enableEdit}/>
          <DisplayBook cover={this.state.cover}/>
        </div>
        <div className="body">
          <div className="info">
            <div className="title section">
              <h5 className="cat-title">TITLE</h5>
              <TextDisplay text={this.state.title} editable={this.state.edit} store={this.setNewTitle} />
            </div>
            <div className="author section">
              <h5 className="cat-author">AUTHOR</h5>
              <TextDisplay text={this.state.author} editable={this.state.edit} store={this.setNewAuthor}/>
            </div>
          </div>
          <div className="footer">
  <Save display={this.state.edit} edit={this.enableEdit} save={this.saveChanges} id={this.state.id} changes={this.getChanges} idChange={this.changeId} changeCover={this.changeCover} addBook={this.bookingsYes}/>
          </div>
        </div>
      </div>
    )
  }
}