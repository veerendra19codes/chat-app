import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import MobileMessages from './components/MobileMessages'
import Groups from './pages/Groups'
import { SocketContextProvider } from './contexts/socketContext'

export default function App() {

  return (
    <>
    <SocketContextProvider>

      <Navbar />
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/groups" element={<Groups />} />
        <Route path='/mobile-chat' element={<MobileMessages />} />
      </Routes>
    </SocketContextProvider>
    </>        
  )
}
