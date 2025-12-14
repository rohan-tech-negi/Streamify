import React, { useState } from 'react'
import {useQueryClient, useQuery, useMutation} from "@tanstack/react-query"
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api'
// import {useThemeStore} from "../store/useThemeStore.js"
const HomePage = () => {
  const queryClient = useQueryClient()
  const[outgoingRequestsIds, setOutgoingRequestsIds] = useState([])

  const {data: friends=[], isLoading:loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends
  })

  const {data:recommendedUsers=[], isLoading:loadingUsers} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers
  })

  const {data: outgoingFriendReqs} = useQuery({
    queryKey:["outgoingFriendreqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const {mutate: sendRequestMutation, isPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["outgoingFriendReqs"]}),
  })
  return (
    <div>

    </div>
  )
}

export default HomePage