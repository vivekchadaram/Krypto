import mongoose from "mongoose";
import express from "express";
import alertModel from "../models/alertModel.js";

const alertRouter = express.Router();

alertRouter.use(express.json());

alertRouter.route('/')
.get( async (req,res)=>{
    const data = await alertModel.find()
    if (!data){
        res.status(404).json({status:"not ok", message:"no alerts found"});
    }
    res.status(200).json(data);
})
.post(async (req,res)=>{
    const data = req.body;
    const createalert = new alertModel(data)
    try{
       console.log(createalert);
       await createalert.save()
       res.status(201).json(createalert);
    }
    catch(err){
        res.status(404).json(err);
    }
})
.delete( async (req,res)=>{
    const alertname = req.body.alertname;
    const alert = await alertModel.findOneAndDelete({alertname:alertname});
    if (!alert){
        res.status(404).json({status:"not ok", message:"recod not found"});
    }
    res.status(201).json(alert);
})
export default alertRouter;