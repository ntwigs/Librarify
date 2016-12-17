import ImagesClient from 'google-images'


export default class ImageSearch {
  constructor() {
    this.client = new ImagesClient('')
  }

  readAll() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM Books', (err, books) => {
          if (err) {
            reject(err)
          }
          resolve(books)
        })
      })
    })
  }
}
