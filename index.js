const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
// var fileStore = require('session-file-store')(session);
var session = require('express-session');
// const authenticate = require('./authenticate')
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
app.use(bodyParser.json())


const server = http.createServer(app);
const mongoose = require('mongoose')

const ChatM = require('./models/chats')
const chatRouter = require('./routes/chatRouter');
const userRouter = require("./routes/users");


app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('1234-5678-91011-1233'));
app.use(session({
        name:'session-id',
        secret: "hehesemcret",
        resave: true,
        saveUninitialized: true,
        Domain: 'localhost:3000'
}))
app.use(passport.initialize())
app.use(passport.session())



// function auth(req , res , next){
//     //console.log(req.session);
//     if(!req.user){ //!req.signedCookies.user for cookies , !req.session.user for session
//       var err= new Error("You are not authenticated!!")
//       err.status = 403;
//      return  next(err)
//     }
//     else{

//       next()
   
//     }
// }

// app.use(auth);
app.use('/users', userRouter); 

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
