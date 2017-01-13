import React, { Component } from 'react'

export default class Save extends Component {
  getSave() {
    return this.props.display ? <div className='save' onClick={this.save}>SAVE</div> : null
  }

  save = () => {
    const changes = this.props.changes()
    if (this.props.id) {
      return this.updateOld(changes)
    }
    this.saveNew(changes)
  }

  saveNew(changes) {
    fetch(`http://localhost:8000/create/${changes.title}/${changes.author}`)
        .then(res => res.json())
        .then(json => {
          this.props.idChange(json._id)
          this.props.changeCover(json.image.thumbnail.url)
        })
        .then(() => this.props.save())
        .then(() => this.props.edit())
        .then(() => this.props.addBook())
        .catch((e) => console.log(e))
  }

  updateOld(changes) {
    fetch(`http://localhost:8000/update/${this.props.id}/${changes.title}/${changes.author}`)
        .then(() => {
          this.props.save()
          this.props.edit()
        })
        .catch((e) => console.log(e))
  }

  render() {
    return (
      this.getSave()
    )
  }
}

