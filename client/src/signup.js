import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function waste() {
    const[username , setUsername] = new useState('')
    const[password , setPassword] = new useState('')
    const[roll , setRoll] = new useState(0)
    const[gradyear , setGradyear] = new useState(0)


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate=useNavigate()


    function respondSubmit(){
        axios.post('http://localhost:5000/users/register',{name:username,password:password ,roll:roll , gradyear})
        .then((result) => {
        if(result.data.status)
        {
            console.log(result.data.message);
            console.log('heheheheh');
            navigate('/main')
            
        }
        else
        {
            document.write('')
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
        <input type="number" name="roll" value={roll} onChange={(e)=>setRoll(e.target.value) }/><br/>
        <input type="number" name="gradyear" value={gradyear} onChange={(e)=>setGradyear(e.target.value) }/><br/>
        <button type="submit" onClick={respondSubmit}>submit</button>
    </form>
    </>
  )
}

export default waste