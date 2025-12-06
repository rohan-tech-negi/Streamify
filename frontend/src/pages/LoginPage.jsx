import React, { useState } from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query"

const LoginPage = () => {
  const[loginData, setLoginData] = useState({
    email: "",
    password:""
  })

  const queryClient = useQueryClient()

  const {mutate:loginMutation, isPending, error} = useMutation({
    mutationFn: loginData, 
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]})
  })

  const handleLogin=(e)=>{
      e.preventDefault();
      loginMutation(loginData)
  }
  return (
    <div className=''>

    </div>
  )
}

export default LoginPage