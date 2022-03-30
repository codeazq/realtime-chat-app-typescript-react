import "reflect-metadata";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "./config";
import { addUser, removeUser, getUser, getUsersInRoom } from './users'
import formatMessage from "./messages";

const PORT = config.server.port
const clientURL = config.client.url
const botName = config.server.botName

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: clientURL,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('new user connected')

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    socket.emit('message', formatMessage(botName, `${user.name}, welcome to the ${user.room} room` ))

    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.name}, has joined!` ))

    io.to(user.room).emit('roomUsers', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage(user.name,  message ))
    }

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.name} has left` ))
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    }
    console.log('user disconnected')
  })
})


httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
