import React from 'react'
import './App.css'
import {Routes, Route,} from 'react-router-dom'
import Joint from './component/Join/Joint';
import Chat from './component/Chat/Chat';

const App = () => {
  return (
    < >
     <Routes>
      <Route path='/' element={<Joint />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
    </>
   
  )
}

export default App
