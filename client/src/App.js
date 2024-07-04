import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import MobileMessages from './components/MobileMessages'

export default function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mobile-chat' element={<MobileMessages />} />
      </Routes>
    </>        
  )
}
