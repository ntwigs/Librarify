import express from 'express'
import DAL from '../config/DAL'
import ImageSearch from '../config/ImageSearch'

const router = express.Router()

router.get('/', (req, res) => {
  const dal = new DAL()
  let connection

  dal.connect()
    .then(db => connection = db)
    .then(() => console.log('connected'))
    .then(() => dal.readAll(connection))
    .then((all) => res.send(all))
    .then(() => dal.close(connection))
    .catch(err => console.log(err))
})

router.get('/create/:title/:author', (req, res) => {
  const title = req.params.title
  const author = req.params.author
  const imageSearch = new ImageSearch()
  const dal = new DAL()
  let image
  let connection

  imageSearch.search(title, author)
  .then(img => image = img)
  .then(() => dal.connect())
  .then((db) => connection = db)
  .then(() => dal.createBook(connection, title, author, image))
  .then((newBook) => res.send(newBook.ops[0]))
  .then(() => dal.close(connection))
  .catch((err) => console.log(err))

})

router.get('/delete/:id', (req, res) => {
  const bookId = req.params.id
  const dal = new DAL()

  let author
  
  dal.getAuthorsBook(bookId)
  .then((book) => author = book)
  .then(() => dal.deleteBook(bookId))
  .then(() => dal.authorHasBooks(author.author_id))
  .then((books) => {
    if (books === undefined) {
      return dal.deleteAuthor(author.author_id)
    }
  })
  .then(() => dal.removeFromBooksAuthors(author.author_id, bookId))
  .then(() => dal.close())
  .then(() => res.send('success'))
  .catch((err) => console.log(err))
})

router.get('/:id', (req, res) => {
  const bookId = req.params.id
  let book
  
  const dal = new DAL()
  dal.getOneBook(bookId)
  .then((b) => book = b)
  .then(() => dal.close())
  .then(() => res.send(book))
  .catch((err) => res.send(err))
})

router.get('/update/:id/:title/:author', (req, res) => {
  const bookId = req.params.id
  const title = req.params.title
  const author = req.params.author
  const dal = new DAL()
  let authorId
  let oldAuthor

  dal.getAuthorsBook(bookId)
  .then(author => oldAuthor = author)
  .then(() => dal.checkAuthor(req.params.author))
  .then(() => dal.getAuthorId(req.params.author))
  .then((author) => dal.updateAuthor(author.author_id, bookId))
  .then(() => dal.updateBook(bookId, title))
  .then((author) => dal.authorHasBooks(oldAuthor.author_id))
  .then((books) => {
    if (books === undefined) {
      return dal.deleteAuthor(oldAuthor.author_id)
    }
  })
  .then(() => dal.close())
  .then(() => res.send('Success'))
  .catch((err) => console.log(err))
})

export default router