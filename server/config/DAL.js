import sqlite3 from 'sqlite3'

export default class DAL {
  constructor() {
    this.sql = sqlite3.verbose()
    this.db = new this.sql.Database('config/secret/Library')
  }

  readAll() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT author_name, book_name, book_cover, book_id FROM Books INNER JOIN Authors ON Books.book_author=Authors.author_id', (err, books) => {
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
        this.checkAuthor(author)
          .then((auth) => this.getAuthorId(auth))
          .then((authorId) => this.insertBook(title, authorId, image))
          .then(() => this.getBookOnCreation(title, author, image))
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    })
  }

  checkAuthor(author) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Authors WHERE author_name = (?)', author, (err, res) => {
        if (err) {
          reject(err)
        }
        if (res === undefined) {
          return this.createAuthor(author)
          .then((l) => resolve(author))
        }
        resolve(author)
      })
    })
  }

  getAuthorId(author) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT author_id FROM Authors WHERE author_name = (?)', author, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

  createAuthor(author) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Authors (author_name) VALUES (?)', author, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

  insertBook(title, authorId, image) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Books (book_name, book_author, book_cover) VALUES (?, ?, ?)', title, authorId.author_id, image.thumbnail.url, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(authorId.author_id)
      })
    })
  }

  getBookOnCreation(title, author) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM Books INNER JOIN AUthors ON Books.book_author=Authors.author_id WHERE book_name = (?) AND author_name = (?)', title, author, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
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
        this.db.get('SELECT * FROM Books INNER JOIN Authors ON Books.book_author=Authors.author_id WHERE book_id = (?)', id, (err, res) => {
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

  bookSearch(text) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT book_id FROM Books WHERE book_name LIKE (?)', '%' + text + '%', (err, res) => {
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
