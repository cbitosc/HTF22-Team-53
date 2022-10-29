const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
app.use(bodyParser.json())


const server = http.createServer(app);
const mongoose = require('mongoose')

const ChatM = require('./models/chats')
const chatRouter = require('./routes/chatRouter')



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use('/fetch' , chatRouter)

io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        ChatM.create({message:data.message , author:data.author , time:data.time , room:data.room})
        .then((msg)=>{
          console.log('msg created succesfully' , msg)
          }, (err)=>next(err))
        .catch((err)=> next(err))
          });

      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
});

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});
