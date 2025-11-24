import {StreamChat} from "stream-chat"

import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("Stream Api key or secret is missing")
}


const streamClient = StreamChat.getInstance(apiKey,apiSecret);


export const createStreamUser = async (userData) => {
    
}