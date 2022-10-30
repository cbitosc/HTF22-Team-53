var express = require('express');
var bcrypt = require('bcrypt');

const bodyParser = require('body-parser')
var User = require('../models/register')
var userRouter = express.Router();
userRouter.use(bodyParser.json())

var passport = require('passport')
 
// /* GET users listing. */
// userRouter.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// })

//signup will be done by cbit-admin s
// userRouter.post('/signup', function(req, res, next) {
//   User.register(new User({username:req.body.username}) , req.body.password ,(err ,user)=>{
//     if(err){
//       res.statusCode=500
//       res.setHeader('Content-Type' ,  'application/json')
//      res.json({err:err})
//     }
//     else {
//       passport.authenticate('local')(req,res , ()=>{
//         res.statusCode = 200
//         res.setHeader('Content-Type' ,  'application/json')
//         res.json({status:'Registration Successfull' , success:true})
//       })
//     }
   
//   })
// })


// userRouter.post('/login' , async (req,res)=>{  //it is for passport
    
//     // console.log("you are at login router");
//     // res.statusCode = 200
//     // res.setHeader('Content-Type' ,  'application/json')
//     // res.send({message:'You are  Successfully loggedin',status:true})
//     // res.redirect('/');
//     try{
//         const hashedPassword =await bcrypt.hash(req.body.password,10)
//     }
//     catch{}
// })
userRouter.post('/register', async (req, res) => {
    const { name, password ,roll ,gradyear} = req.body
    console.log(name, password);
    try {
        const response = await User.findOne({ name: name, password: password })
        if (response) {
            res.send({ status: false, message: 'already account exist!' })
        }
        else {
            try {
                const saltRounds = 12;
                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    // Store hash in your password DB.
                    try {
                        const response = await User.insertMany({ name: name, password: hash ,roll:roll,gradyear:gradyear })
                        if (response) {
                            res.send({ status: true, message: 'inserted succesful' })
                        }
                        else {
                            res.send({ status: false, message: 'unable to proceed try again!' })
                        }
                    }
                    catch (err) {
                        res.send({ status: false, message: 'something error happeneded' })
                    }

                });

            } catch (error) {
                console.log("hi" ,error);
            }


        }
    } catch (error) {
        console.log(error)
    }


})

userRouter.post('/login', async (req, res) => {
    const { name, password } = req.body

    const response = await User.findOne({ name: name })
    if (response) {
        bcrypt.compare(password, response.password, function (err, result) {
            // result == true
            if (result) {
                if(name==='qwerty')
                {req.session.admin=true}
                
                req.session.activeStat = true
                res.send({ status: true, message: 'logged in succesfuly' })
            }
            else {
                res.send({
                    status: false, message: 'username or passwrod incorrect'
                })

            }
        });

    }
    else {
        res.send({ status: false, message: 'credentials mis match' })
        console.log('unable to fetch');
    }


})

userRouter.post('/logout',(req,res)=>
{ if(req.session.admin)
    {
        req.session.admin=false
        req.session.activeStat=false
        return res.send({status:true,message:'logged out!'})
    }
    else
    {
        req.session.activeStat=false
       return res.send({status:true,message:'logged out!'})
    }
    
})

module.exports = userRouter;
