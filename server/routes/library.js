import express from 'express'
import DAL from '../config/DAL'
import ImageSearch from '../config/ImageSearch'

const router = express.Router()

router.get('/', (req, res) => {
  const dal = new DAL()
  let connection

  dal.connect()
    .then(db => connection = db)
    .then(() => dal.readAll(connection))
    .then((all) => res.send(all))
    .then(() => dal.close(connection))
    .catch(err => console.log(err))
})

router.get('/create/:title/:author', (req, res) => {
  const dal = new DAL()
  const title = req.params.title
  const author = req.params.author
  const imageSearch = new ImageSearch()
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
  const dal = new DAL()
  const bookId = req.params.id
  let author
  let connection

  dal.connect()
    .then(db => connection = db)
    .then(() => dal.deleteBook(connection, bookId))
    .then(() => res.send('success'))
    .then(() => dal.close(connection))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const dal = new DAL()
  const bookId = req.params.id
  let book
  let connection

  dal.connect()
    .then(db => connection = db)
    .then(() => dal.readOne(connection, bookId))
    .then(book => res.send(book))
    .then(() => dal.close(connection))
    .catch(err => console.log(err))
})

export default router