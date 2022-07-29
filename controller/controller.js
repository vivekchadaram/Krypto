import {} from 'dotenv/config'
import registerSchema from '../models/register.js'
// import loginSchema from '../models/login.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyparser  from 'body-parser';
const jsbody = bodyparser.json()
import bcrypt from 'bcrypt';

export const registerUser = async (req,res) => {
   const uid = req.body.userid;
   req.body.password = await bcrypt.hash(req.body.password, 10)
   const register = new registerSchema(req.body)
   try{
      // console.log(register);
      await register.save()
      res.status(201).json(register);
   }
   catch(err){
      if (err.code == 11000)
      { res.status(800).json({status: "duplicate"}) }
      else{
         res.status(404).json(err);
      }
   }
};

export const loginUser = async (req, res) => {
   const uid = req.body.userid;
   const passd = req.body.password;
   console.log(uid,passd)

   try{
      const rec = await registerSchema.findOne({userid: uid})
      console.log(rec);
      if (uid == rec.userid){
         if (bcrypt.compare(passd,rec.password)){
            const user = {userid:req.body.userid}
            const JWTtoken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({status:"ok", message:"record Found", accesstoken:JWTtoken});
         }
         else{
            res.status(401).json({status:"not ok",message:"Wrong password"})
         }
      }
      else{
         res.status(401).json({status:"not ok",message:"Wrong User Id"})
      }
   }
   catch(err){
      res.status(401).json({status:"not ok", message:err})
   }
}