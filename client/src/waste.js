import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function waste() {
    const[username , setUsername] = new useState('')
    const[password , setPassword] = new useState('')


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate=useNavigate()


    function respondSubmit(){
        axios.post('http://localhost:5000/users/login',{name:username,password:password })
        .then((result) => {
        if(result.data.status)
        {
            console.log(result.data.message);
            console.log('heheheheh');

            navigate('/main')
            
        }
        else
        {
            document.write('hello')
        }
        })
        .catch((err) => {
        console.log(err);
        });
    }

  return (
    <>
    <form method='POST'>
        <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
        <input type="text" name="password" value={password} onChange={(e)=>setPassword(e.target.value) }/><br/>
        <button type="submit" onClick={respondSubmit}>submit</button>
    </form>
    </>
  )
}

export default waste