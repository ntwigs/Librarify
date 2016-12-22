import express from 'express'
import DAL from '../config/DAL'
import ImageSearch from '../config/ImageSearch'
import socket from 'socket.io'

const router = express.Router()
const io = socket()

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
  const imageSearch = new ImageSearch()
  const dal = new DAL()
  let createdBook

  imageSearch.search(title, author)
  .then((image) => {
    console.log(image)
    
    return dal.createNewBook(title, author, image)
    
  })
  .then((result) => {
    createdBook = result
    return dal.close()
  })
  .then(() => res.send(createdBook))
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

   io.on('connection', (client) => {
    client.on('searching', (data) => {
      console.log(data)
    })
  })
  
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
  dal.checkAuthor(req.params.author)
  .then(() => dal.getAuthorId(req.params.author))
  .then((authorId) => dal.updateBook(bookId, title, authorId.author_id))
  .then(() => dal.close())
  .then(() => res.send('Success'))
  .catch((err) => res.send(err))
})

router.get('/search', (req, res) => {
   io.on('connection', (client) => {
    client.on('searching', (data) => {
      console.log(data)
    })
  })

})

export default router