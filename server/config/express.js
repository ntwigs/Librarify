import express from 'express'
import cors from 'cors'
import library from '../routes/library'
import http from 'http'
import socket from 'socket.io'
import socketHandler from '../routes/socketHandler'

const app = express()
const server = http.createServer(app)
const io = socketHandler(server)
const PORT = 8000

app.use(cors())

app.use('/', library)

app.use('*', (req, res) => {
  return res.send('Not valid')
})

server.listen(PORT, () => {
  console.log('Express ups. ' + PORT)
})

export default app