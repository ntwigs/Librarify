import ImagesClient from 'google-images'
import SECRET from './secret/Google-Api'


export default class ImageSearch {
  constructor() {
    this.client = new ImagesClient(SECRET.CSE, SECRET.API)
  }

  search(title, author) {
    return new Promise((res, rej) => {
      this.client.search(`${title} ${author}`)
      .then(images => res(images[0]))
      .catch(err => res(err))
    })
  }
}
