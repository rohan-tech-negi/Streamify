// import React, { useEffect, useState } from 'react'
import {Navigate, Route, Routes} from "react-router"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import {Toaster} from "react-hot-toast"
import Layout from "./components/Layout.jsx"
// import { useQuery } from '@tanstack/react-query'
// import axios from "axios"
// import { axiosInstance } from './lib/axios.js'
import PageLoader from './components/PageLoader.jsx'
// import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'
const App = () => {

  const {isLoading, authUser}  = useAuthUser()
  
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  

  if(isLoading) return <PageLoader></PageLoader>

  return (
    <div className='' data-theme="coffee">
    
    <Routes>
  <Route
  path="/"
  element={
    isAuthenticated && isOnboarded ? (
      <Layout >
        <HomePage />
      </Layout>
      
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  }
/>

      <Route path='/signup' element={!isAuthenticated ? <SignUpPage></SignUpPage> : <Navigate to= {
        isOnboarded ? "/" : "/onboarding"
      }></Navigate>}></Route>
      <Route path='/login' element={ !isAuthenticated ?  <LoginPage></LoginPage> : <Navigate to= {
        isOnboarded ? "/" : "/onboarding"
      }></Navigate>}></Route>
      <Route path='/notification' element ={isAuthenticated ? <NotificationPage></NotificationPage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/call' element={isAuthenticated ? <CallPage></CallPage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/chat' element={isAuthenticated ?  <ChatPage></ChatPage> : <Navigate to="/login"></Navigate>}></Route>
      <Route path='/onboarding' element={isAuthenticated ? (
        !isOnboarded ? (
          <OnboardingPage></OnboardingPage>
        ) : (
          <Navigate to= "/"></Navigate>
        )
        
      ) : (
        <Navigate to="/login"></Navigate>
      )}></Route>
    </Routes>

    <Toaster></Toaster>
    </div>
  )
}

export default App