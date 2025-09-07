// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import { colors } from './styles/colors';
// import { Login } from './screens/Login';

function App() {
  return (
    <div className='h-screen overflow-y-scroll custom-scrollbar'
      style={{ background: `linear-gradient(
          to bottom right,
          ${colors.bgMain} 0%,
          ${colors.bgMid} 50%,
          ${colors.bgMain} 100%
        )`
      }}
        
    >
     <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Landing/> }  />
        <Route path="/game" element={ <Game/> }  />
        {/* <Route path="/game" element={ <Login/> }  /> */}
      </Routes>
     </BrowserRouter>
    </div>
  )
}
export default App