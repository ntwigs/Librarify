import React, { Component } from 'react'

export default class Save extends Component {
  getSave() {
    return this.props.display ? <div className='save' onClick={this.save}>SAVE</div> : null
  }

  save = () => {
    this.props.save()
    this.props.edit()
  }

  render() {
    return (
      this.getSave()
    )
  }
}

