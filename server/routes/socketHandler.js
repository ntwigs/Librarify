import socket from 'socket.io'
import DAL from '../config/DAL'

export default (server) => class SocketHandling {
  constructor() {
    this.io = socket.listen(server)
    this.connection
  }

  initialize() {
    this.io.on('connection', (client) => {
      client.on('openDB', () => {
        this.dal = new DAL()
      })

      client.on('searching', (data) => {
        this.dal.connect()
          .then(db => this.connection = db)
          .then(() => this.dal.bookSearch(this.connection, data))
          .then(res => this.io.emit('result', res))
          .catch(err => console.log(err))
      })

      client.on('closeDB', () => {
        this.dal.close(this.connection)
      })
    })
  }
}
