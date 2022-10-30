const mongoose =require('mongoose')
const schema =mongoose.Schema
// var passportLocalMongoose = require('passport-local-mongoose')

const Mongoose =require('mongoose').Mongoose
const instance2 = new Mongoose()

const url = 'mongodb+srv://sathwik13:edspread@cluster0.j2qeppm.mongodb.net/?retryWrites=true&w=majority'
const connect = instance2.connect(url)

const registerSchema = new schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    roll:{
        type:Number,
        required:true,
    },
    gradyear:{
        type:Number,
        required:true,
    },
})
//registerSchema.plugin(passportLocalMongoose)


var Register = instance2.model('Regsiter' , registerSchema)

module.exports =Register