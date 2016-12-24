import ImagesClient from 'google-images'
import SECRET from './secret/Google-Api'


export default class ImageSearch {
  constructor() {
    this.client = new ImagesClient(SECRET.CSE, SECRET.API)
  }

  search(title, author) {
    return new Promise((res, rej) => {
      this.client.search(`${title} ${author}`)
      .then(images => {
        res(images[0])
      })
      .catch(err => res({thumbnail: {url: 'http://pre13.deviantart.net/30de/th/pre/i/2010/247/e/0/old_leather_book_by_enginemonkey-d2xyznb.jpg' }}))
    })
  }
}


