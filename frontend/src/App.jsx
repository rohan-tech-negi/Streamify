import React, { useEffect, useState } from 'react'
import {Navigate, Route, Routes} from "react-router"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import {Toaster} from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
// import axios from "axios"
import { axiosInstance } from './lib/axios.js'
const App = () => {

  const{data:authData, isLoading, error} = useQuery({queryKey:"authUser", 
    queryFn: async()=>{
      const res = await axiosInstance.get("/auth/me")
    
      return res.data;
    },
    retry:false
  })
  const authUser = authData?.user


  return (
    <div className='flex  h-screen justify-center items-center' data-theme="coffee">
    
    <Routes>
      <Route path='/' element={authUser ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/signup' element={!authUser ? <SignUpPage></SignUpPage> : <Navigate to="/"></Navigate>}></Route>
      <Route path='/login' element={ !authUser ?  <LoginPage></LoginPage> : <Navigate to="/"></Navigate>}></Route>
      <Route path='/notification' element={authUser ? <NotificationPage></NotificationPage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/call' element={authUser ? <CallPage></CallPage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/chat' element={authUser ?  <ChatPage></ChatPage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/onboarding' element={authUser ?  <OnboardingPage></OnboardingPage> : <Navigate to="/login"></Navigate>}></Route>
    </Routes>

    <Toaster></Toaster>
    </div>
  )
}

export default App