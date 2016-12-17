import express from 'express'
import DAL from '../config/DAL'

const router = express.Router()

router.get('/', (req, res) => {
  const dal = new DAL()
  let books

  dal.readAll()
  .then((e) => books = e)
  .then(() => dal.close())
  .then(() => res.send(books))
  .catch((err) => res.send(err))
})

router.get('/create/:title/:author', (req, res) => {
  const title = req.params.title
  const author = req.params.author

  const dal = new DAL()
  dal.createNewBook(title, author)
  .then(() => dal.close())
  .then(() => res.send('success'))
  .catch((err) => res.send(err))
})

router.get('/delete/:id', (req, res) => {
  const bookId = req.params.id

  const dal = new DAL()
  dal.deleteBook(bookId)
  .then(() => dal.close())
  .then(() => res.send('success'))
  .catch((err) => res.send(err))
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
  dal.updateBook(bookId, title, author)
  .then(() => dal.close())
  .then(() => res.send('Success'))
  .catch((err) => res.send(err))
})

export default router