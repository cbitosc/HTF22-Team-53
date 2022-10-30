import React from 'react'
import AppC from './AppC'
import Alumni from './Alumni'
import Waste from './waste'
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
        <Route path="/main" element={<Alumni/>} />
        <Route path="/connect" element={<AppC/>} />
        <Route path="/" element={<Waste />} />
     </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App