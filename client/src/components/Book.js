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
      author: [this.props.author],
      cover: this.props.cover,
      newTitle: '',
      newAuthor: [''],
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

  setNewAuthor = (author, index) => {
    let authors = this.state.newAuthor
    authors[index] = author
    this.setState({newAuthor: authors})
  }

  getChanges = () => {
    const newTitle = this.state.newTitle !== '' ? this.state.newTitle : this.state.title 
    const newAuthor = this.state.newAuthor !== '' ? this.state.newAuthor : this.state.author
    let authors = newAuthor.join(',')
    return {title: newTitle, author: authors}
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

  addAuthorFields = () => {
    const field = this.state.author
    this.setState({
      author: [...field, '']
    }) 
  }

  getAuthorFields = () => {
    let authorArr = []
    for (let i = 0; i < this.state.author.length && i < 2; i++) {
      authorArr.push(this.createField(this.state.author[i], i))
    }
    return authorArr
  }

  createField(author, index) {
    return <TextDisplay key={index} id={index} text={author} editable={this.state.edit} store={this.setNewAuthor} delete={this.deleteField}/>
  }

  deleteField = (id) => {
    const fields = this.state.author
    const newFields = this.state.newAuthor
    fields.splice(id, 1)
    newFields.splice(id, 1)
    this.setState({
      author: fields,
      newAuthor: newFields
    })
  }

  getAddButton = () => {
    return this.state.edit ? <h7 className='add-author-button' onClick={this.addAuthorFields}>ADD</h7> : null 
  }

  render() {
    return (
      <div className="container">
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
              {this.getAddButton()}
              {this.getAuthorFields()}
            </div>
          </div>
          <div className="footer">
            <Save display={this.state.edit} 
                  edit={this.enableEdit} 
                  save={this.saveChanges} 
                  id={this.state.id} 
                  changes={this.getChanges} 
                  idChange={this.changeId} 
                  changeCover={this.changeCover} 
                  addBook={this.bookingsYes}/>
          </div>
        </div>
      </div>
    )
  }
}