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
  .catch((err) => res.send('An error occured', err))
})

router.get('/create/:title/:author', (req, res) => {
  const title = req.params.title
  const author = req.params.author

  const dal = new DAL()
  dal.createNewBook(title, author)
  .then(() => dal.close())
  .then(() => res.send('success'))
  .catch((e) => res.send('An error occured', err))
})

router.get('/delete/:id', (req, res) => {
  const bookId = req.params.id

  const dal = new DAL()
  dal.deleteBook(bookId)
  .then(() => dal.close())
  .then(() => res.send('success'))
  .catch((e) => res.send('An error occured', err))
})

router.get('/:bookId', (req, res) => {
  const bookId = req.params.id
  let book

  const dal = new DAL()
  dal.getOneBook(bookId)
  .then((b) => book = b)
  .then(() => dal.close())
  .then(() => res.send(book))
  .catch((e) => res.send('An error occured', err))
})


export default router