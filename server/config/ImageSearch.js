import ImagesClient from 'google-images'
import SECRET from './secret/Google-Api'


export default class ImageSearch {
  constructor() {
    this.client = new ImagesClient(SECRET.CSE, SECRET.API)
  }

  search(title, author) {
    let authorArr = author.join(' ')
    return new Promise((res, rej) => {
      this.client.search(`${title} ${authorArr}`)
      .then(images => res(images[0]))
      .catch(err => res(err))
    })
  }
}
