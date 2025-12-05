import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {toast} from "react-hot-toast"

const OnboardingPage = () => {
  const {authUser} = useAuthUser()
  const queryClient = useQueryClient()

    const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const {mutation:onboardingMutation, isPending} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: ()=>{
      toast.success("profile onboarded successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]})
    }
  })

  return (
    <div>OnboardingPage</div>
  )
}

export default OnboardingPage