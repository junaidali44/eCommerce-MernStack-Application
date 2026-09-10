import User from "../models/user.model.mjs";
import asynchandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = asynchandler(async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  if (!name || !email || !password || !address || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exist" });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  if (!passwordHash) {
    return res
      .status(500)
      .json({ success: false, message: "Password hashing failed" });
  }
  const CreateUser = await User.create({
    name,
    email,
    password: passwordHash,
    address,
    phone,
  });
  if (!CreateUser) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create user" });
  }
  return res
    .status(201)
    .json({ success: true, message: "User created successfully" , user: CreateUser});
});
const login = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, userExist.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
const token = jwt.sign({_id:userExist._id,email:userExist.email},process.env.JWT_SECRET_KEY,{expiresIn:"24h"})  ;
if(!token){
    return res.status(500).json({success:false,message:"Token generation failed"});
}
return res.status(200).json({success:true,message:"Login successful",token:token,user:userExist})
});

export { register, login };