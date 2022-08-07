import {} from 'dotenv/config'
import registerSchema from '../models/registerUser.js'
// import loginSchema from '../models/login.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyparser  from 'body-parser';
const jsbody = bodyparser.json()
import bcrypt from 'bcrypt';
import alertModel from "../models/alertModel.js";
import {getprice} from '../utils/getPrice.js';

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

export const getAlerts = async (req,res)=>{
   const completeddata = await alertModel.find({status:"completed"}).sort({'createdAt':-1})
   const pendingdata = await alertModel.find({status:"pending"}).sort({'createdAt':-1})
   const data=completeddata.concat(pendingdata)
   // if (!data){
   //     res.status(404).json({status:"not ok", message:"no alerts found"});
   // }
   // console.log(data);
   res.status(200).json(data);
}

export const createAlert = async (req,res)=>{
   const data = req.body;
   if (data.asset.toLowerCase()!="btc" && data.asset.toLowerCase()!="eth"){
      return res.status(400).json({
         error: true,
         message: "You can set alerts for BTC and ETH only.",
       });
   }
   const createalert = new alertModel(data)
   try{
      console.log(createalert);
      await createalert.save()
      res.status(201).json(createalert);
   }
   catch(err){
       res.status(404).json(err);
   }
}

export const deletAlert = async (req,res)=>{
   const alertname = req.body.alertname;
   const alert = await alertModel.findOneAndDelete({alertname:alertname});
   if (!alert){
       res.status(404).json({status:"not ok", message:"recod not found"});
   }
   res.status(201).json(alert);
}

export const Currentprice = async (req,res)=>{
   const currprice = await getprice();
   console.log(currprice);
   res.json({"currentPrice":currprice});
}