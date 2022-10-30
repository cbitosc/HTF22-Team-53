const express = require('express')
const chatRouter  =express.Router()

const ChatM = require('../models/chats')

chatRouter.route("/load/:roomID")
.get((req,res)=>{
    ChatM.find({room:req.params.roomID})
    .then((data)=>{res.json(data)
    console.log("data being sent to client" ,data)
    })
})

module.exports = chatRouter 