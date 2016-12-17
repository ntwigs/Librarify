import sqlite3 from 'sqlite3'

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

  createNewBook(title, author, image) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('INSERT INTO Books (book_name, book_author, book_cover) VALUES (?, ?, ?)', title, author, image.url, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }

  deleteBook(id) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('DELETE FROM Books WHERE book_id = (?)', id, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }

  getOneBook(id) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get('SELECT * FROM Books WHERE book_id = (?)', id, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }

  updateBook(id, title, author) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('UPDATE Books SET book_author = (?), book_name = (?) WHERE book_id = (?) ', author, title, id, (err, res) => {
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
