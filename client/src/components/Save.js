import React, { Component } from 'react'

export default class Save extends Component {
  getSave() {
    return this.props.display ? <div className='save' onClick={this.save}>SAVE</div> : null
  }

  save = () => {
    const changes = this.props.changes()

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

