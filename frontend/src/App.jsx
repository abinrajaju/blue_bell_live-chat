import React from 'react'
import Navbar from './componets/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'


const App = () => {
     const {authUser}= useAuthStore()
  return (
    <div>
      <h1>hello</h1>
      <Navbar/>
      <Routes>
        <Route  path="/" element={<HomePage/>}/>
        <Route  path="/signup" element={<SignupPage/>}/>
        <Route  path="/login" element={<LoginPage/>}/>
        <Route  path="/settings" element={<SettingsPage/>}/>
        <Route  path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App

