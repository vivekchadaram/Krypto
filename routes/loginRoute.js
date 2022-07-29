import {} from 'dotenv/config'
import mongoose from "mongoose";
import express from "express";
import registerModel from "../models/registerUser.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

const loginRouter = express.Router();

loginRouter.use(express.json());

loginRouter.route('/')
.post( async (req,res)=>{
    const uid = req.body.userid;
   const passd = req.body.password;
   console.log(uid,passd)

   try{
      const rec = await registerModel.findOne({userid: uid})
      console.log(await bcrypt.compare(passd,rec.password));
      if (uid == rec.userid){
         if (await bcrypt.compare(passd,rec.password)){
            const user = {userid:uid}
            const JWTtoken = jwt.sign(user,ACCESS_TOKEN_SECRET)
            res.status(200).json({status:"ok", message:"record Found", accesstoken:JWTtoken});
         }
         else{
            res.status(404).json({status:"not ok",message:"Wrong password"})
         }
      }
      else{
         res.status(404).json({status:"not ok",message:"Wrong User Id"})
      }
   }
   catch(err){
      res.status(404).json({status:"not ok", message:err})
   }
})

export default loginRouter;