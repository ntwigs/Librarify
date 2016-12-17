import React, { Component } from 'react'
import DisplayBook from './DisplayBook'

export default class Book extends Component {
  render() {
    return (
      <DisplayBook cover={'http://static.wixstatic.com/media/26f38b_edfdf84993cb45358700f0ca9fed42c2~mv2.jpg'}/> //Url
    )
  }
}

