import React, { useState } from 'react'

const SignUpPage = () => {
  const[signupData, setSignupData] = useState({
    fullName:"",
    email:"",
    password:""
  });

  const handleSignup = (e) =>{
    e.preventDefault()
  }
  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage