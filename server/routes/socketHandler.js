import socket from 'socket.io'

export default (server) => {
    const io = socket.listen(server)

    io.on('connection', (client) => {
      client.on('searching', (data) => {
        console.log(data)
      })
    })

}