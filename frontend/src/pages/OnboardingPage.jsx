import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {toast} from "react-hot-toast"
import { completeOnboarding } from '../lib/api'
import {ShuffleIcon } from "lucide-react"

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

   const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };


  const handleRandomAvatar =()=>{

  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your profile</h1>
        </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
              {/* profile picture container */}
              <div className='flex flex-col items-center justify-center space-y-4'>
                {/* image preview */}
                  <div className='size-32 rounded-full bg-base-300 overflow-hidden'>

                  </div>

                  {/* generate random avatar btn */}
                  <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
              </div>
          </form>
      </div>

    </div>
  )
}

export default OnboardingPage