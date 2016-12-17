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

})

router.get('/create/:title/:author', (req, res) => {
  const title = req.params.title
  const author = req.params.author

  const dal = new DAL()
  dal.createNewBook(title, author)
  .then(() => dal.close())
  .then(() => res.send('success'))
  .catch(() => res.send('An error occured'))
})

export default router