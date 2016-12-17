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

export default router