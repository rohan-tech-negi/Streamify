import User from "../models/user.js"
import jwt from "jsonwebtoken"
export async function signup(req,res){
    const{email, password, fullName} = req.body

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 character long"})
        }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
         const existingUser = await User.findOne({email});
         if(existingUser){
            res.status(400).json({message:"email already existed, use different email"})
         }

         const idx = Math.floor(Math.random() * 100) + 1;
         const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

         const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

         const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
         })

         res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 *60 *1000,
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
         })
        
         res.status(201).json({success:true, user:newUser})
    } catch (error) {
        console.log("Error in signup controler", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function login(req,res){
    try {
        const {email, password} = req.body();

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"Invaid email or password"})

        const isPasswordCorrect = await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid password"})


        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
         })

         res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 *60 *1000,
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
         })


         res.status(200).json({success:true, user})
    } catch (error) {
        console.group("Error in loogin controler", error.message)
        res.status(500).json({message:"Internal server error"})
    }
}


export function logout(req,res){
    res.clearCookie("jwt")
    res.status(200).json({success:true, message:"Logout successful"})
}