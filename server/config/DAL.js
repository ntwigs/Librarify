import sqlite3 from 'sqlite3'

export default class DAL {
  constructor() {
    this.sql = sqlite3.verbose()
    this.db = new this.sql.Database('config/secret/Library')
  }

  readAll() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(`SELECT author_name, book_title, book_cover, BooksAuthors.book_id
                     FROM BooksAuthors
                     INNER JOIN Authors
                     ON BooksAuthors.author_id = Authors.author_id
                     INNER JOIN Books
                     ON BooksAuthors.book_id = Books.book_id`, (err, books) => {
          if (err) {
            reject(err)
          }
          resolve(books)
        })
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

  createBook(title, image) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Books (book_title, book_cover) VALUES (?, ?)', title, image.thumbnail.url, function(err, res) {
       if (err) {
          reject(err)
        }
        resolve(this.lastID)
      })
    })
  }

  createAuthorBookRelation(bookid, authorid) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO BooksAuthors (book_id, author_id) VALUES (?, ?)', bookid, authorid.thumbnail.url, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

  getBookOnCreation(title, author) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        console.log(title, author)
        this.db.get(`SELECT * 
                    FROM BooksAuthors 
                    INNER JOIN Authors
                    ON BooksAuthors.author_id = Authors.author_id
                    INNER JOIN Books
                    ON BooksAuthors.book_id = Books.book_id 
                    WHERE BooksAuthors.book_id = (?)
                    AND BooksAuthors.author_id = (?)`, title, author.author_id, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }

  insertRelation(bookid, authorid) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('INSERT INTO BooksAuthors (book_id, author_id) VALUES (?, ?)', bookid, authorid.author_id, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(bookid)
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

  getAuthorsBook(id) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get(`SELECT author_name, book_title, book_cover, BooksAuthors.book_id
                     FROM BooksAuthors
                     INNER JOIN Authors
                     ON BooksAuthors.author_id = Authors.author_id
                     INNER JOIN Books
                     ON BooksAuthors.book_id = Books.book_id
                     WHERE BooksAuthors.book_id = (?)`, id, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }

  authorHasBooks(author) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get('SELECT * FROM Books INNER JOIN Authors ON Books.book_author=Authors.author_id WHERE author_name = (?)', author, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    })
  }

  deleteAuthor(id) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('DELETE FROM Authors WHERE author_id = (?)', id, (err, res) => {
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
        this.db.run('UPDATE Books SET book_author = (?), book_title = (?) WHERE book_id = (?) ', author, title, id, (err, res) => {
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
        this.db.all(`SELECT author_name, book_title, book_cover, BooksAuthors.book_id 
                     FROM BooksAuthors 
                     INNER JOIN Authors 
                     ON BooksAuthors.author_id = Authors.author_id
                     INNER JOIN Books
                     ON BooksAuthors.book_id = Books.book_id
                     WHERE book_title 
                     LIKE (?) 
                     OR author_name 
                     LIKE (?)`, '%' + text + '%', '%' + text + '%', (err, res) => {
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
