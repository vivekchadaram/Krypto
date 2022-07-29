import mongoose from "mongoose";

const alertSchema = mongoose.Schema({
    alertname:{
        type:String,
        unique:true
    },
    value:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    }
},
{collection:"alerts"}
)

const alertModel = mongoose.model("alertModel", alertSchema);

export default alertModel;