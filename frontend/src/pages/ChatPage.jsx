import React, { useEffect, useState } from 'react'
import {useParams} from "react-router"
import {useQuery} from "@tanstack/react-query"
import {getStreamToken} from "../lib/api.js"
import useAuthUser from "../hooks/useAuthUser.js"
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from 'stream-chat'
import {toast} from "react-hot-toast"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY


const ChatPage = () => {
 const {id: targetUserId} = useParams()

 const [chatClient, setChatClient] = useState(null);
 const[channel, setChannel] = useState(null);
 const [loading, setLoading] = useState(true);

 const {authUser} = useAuthUser()

 const {data:tokenData } = useQuery({
    queryKey:["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
 })

 useEffect(()=>{
    const initChat = async()=>{
      if(!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client ... ")
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, tokenData.token)

        const channelId = [authUser._id, targetUserId].sort().join("-");


        const currChannel = client.channel("message", channelId, {
          members: [authUser._id , targetUserId],
        })

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel)
      } catch (error) {
        toast.error("Could not connect to chat. please try again", error);
      } finally{
        setLoading(false)
      }
    }
 },[])

 if(loading || !chatClient || !channel) return <ChatLoader></ChatLoader>
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage