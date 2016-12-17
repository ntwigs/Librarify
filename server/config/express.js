import express from 'express'
import cors from 'cors'
import library from '../routes/library'

const app = express()
const PORT = 8000

app.use(cors())

app.use('/', library)

app.use('*', (req, res) => {
  return res.send('Not valid')
})

app.listen(PORT, () => {
  console.log('Express up. ' + PORT)
})

export default app