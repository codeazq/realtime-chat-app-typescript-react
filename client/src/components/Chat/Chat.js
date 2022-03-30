import React, { useState, useEffect } from "react";
import io from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import InfoPanel from '../InfoPanel/InfoPanel'

let socket

const Chat = () => {
  const [searchParams] = useSearchParams()
  const [name, setName] = useState()
  const [room, setRoom] = useState()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [roomUsers, setRoomUsers] = useState([])
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const name = searchParams.get('name')
    const room = searchParams.get('room')

    socket = io(ENDPOINT);

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {

    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, searchParams])


  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  useEffect(() => {
    socket.on('roomUsers', ({ users }) => {
      console.log('inside the on room Users')
      setRoomUsers(users);
    });

  }, [roomUsers])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }


  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <InfoPanel roomUsers={roomUsers} room={room} />
    </div >
  )
}

export default Chat