import sqlite3 from 'sqlite3'

// TODO: Get all, delete one, create one, edit one

export default class SQL {
  constructor() {
    this.sql = sqlite3.verbose()
    this.db = new this.sql.Database('config/secret/Library')
  }

  readAll() {
    return new Promise((res, rej) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM Books', (err, books) => {
          if (err) {
            console.log(err)
          }
          res(books)
        })
      })
    })
  }

  close() {
    this.db.close()
  }
}
