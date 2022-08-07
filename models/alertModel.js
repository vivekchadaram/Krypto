import mongoose from "mongoose";

const alertSchema = mongoose.Schema({
    alertname:{
        type:String,
        unique:true
    },
    asset:{
        type:String,
        required:true,
    },
    value:{
        type:Number,
        required:true,
    },
    slope:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    },
},
{ timestamps: true },
{collection:"alerts"}
)

const alertModel = mongoose.model("alertModel", alertSchema);

export default alertModel;