import React from 'react'
import AppC from './AppC'
import Alumni from './Alumni'
import {BrowserRouter , Routes ,Route} from 'react-router-dom'

// import Waste from './waste'
import Main from './ganesh/main'
import Signin from './ganesh/signin'


// import Signup from './signup'
function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/main" element={<Alumni/>} />
        <Route path="/connect" element={<AppC/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Main />} />
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App