import mongoose from "mongoose";
import express from "express";
import registerModel from "../models/registerUser.js";
import bcrypt  from 'bcrypt';

const registerRouter = express.Router();

registerRouter.use(express.json());

registerRouter.route("/")
.post( async (req,res)=>{
    const uid = req.body.userid;
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const register = new registerModel(req.body)
    try{
       console.log(register);
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
})

export default registerRouter;