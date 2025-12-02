import React, { useEffect, useState } from 'react'
import {Route, Routes} from "react-router"
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

  const{data, isLoading, error} = useQuery({queryKey:"todos", 
    queryFn: async()=>{
      const res = await axiosInstance.get("/auth/me")
    
      return res.data;
    },
    retry:false
  })
  console.log(data)


  return (
    <div className='flex  h-screen justify-center items-center' data-theme="coffee">
    
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>
      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      <Route path='/notification' element={<NotificationPage></NotificationPage>}></Route>
      <Route path='/call' element={<CallPage></CallPage>}></Route>
      <Route path='/chat' element={<ChatPage></ChatPage>}></Route>
      <Route path='/onboarding' element={<OnboardingPage></OnboardingPage>}></Route>
    </Routes>

    <Toaster></Toaster>
    </div>
  )
}

export default App