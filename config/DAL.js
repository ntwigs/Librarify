import sqlite3 from 'sqlite3'

// TODO: Get all, delete one, create one, edit one

export default class SQL {
  constructor() {
    this.sql = sqlite3.verbose()
    this.db = new this.sql.Database('config/secret/Library')
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

  createNewBook(title, author) {
    return new Promise((resolve, reject) => {
        this.db.serialize(() => {
          this.db.run('INSERT INTO Books (book_name, book_author) VALUES (?, ?)', title, author, (err, res) => {
            if (err) {
              reject(err)
            }
            resolve(res)
          })
        })
    })
  }

  close() {
    this.db.close()
  }
}
