import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chats from './chats'

const socket = io.connect('http://localhost:5000')
function App() { 
  const [username , setUsername] = new useState('')
  const [room , setRoom] = new useState('')
  const [showChat , setShowChat] = new useState(false)
  const joinRoom =()=>{
      if(username!=='' && room!==''){
        socket.emit("join_room",room);
        setShowChat(true)
      }
  }
  return (
    <div className="App">
      {!showChat ? <div className='joinChatContainer'>
        <h2>Join the Chat</h2>
      <input type="text" value={username}  placeholder='Sathwik..' onChange={(e)=>{setUsername(e.target.value)}}/>
      <input type="text" value={room}  placeholder='Room Id..'  onChange={(e)=>{setRoom(e.target.value)}}/>
      <button onClick={joinRoom}>Join Room</button>
      </div> : <Chats socket={socket} username={username} room={room}/> }

    </div> 
  );
}

export default App;
