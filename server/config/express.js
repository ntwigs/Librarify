import express from 'express'
import cors from 'cors'
import library from '../routes/library'
import http from 'http'
import socketHandler from '../routes/socketHandler'

const app = express()
const server = http.createServer(app)
const io = socketHandler(server)
const ioInstance = new io()
ioInstance.initialize()
const PORT = 8000

app.use(cors())

app.get('/favicon.ico', (req, res, next) =>  res.sendStatus(404))

app.use('/', library)

app.use('*', (req, res) => {
  return res.send('Not valid')
})

server.listen(PORT, () => {
  console.log('Express up. ' + PORT)
})

export default app