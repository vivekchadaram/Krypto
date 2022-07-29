import mongoose  from 'mongoose';
const { isEmail } = 'validator';

// const schema = mongoose.Schema();

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const registerSchema = mongoose.Schema({
    userid:
    {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address",],
    },
    password:
    {
        type: String,
        required: 'Password is required',
    },
    address:
    {
        type: String,
        min:18,
        required: 'Address is required',
    },
    mobileno:
    {
        type: String,
        length:10,
    }
},
    { collection : "users"}
)

var registerModel = mongoose.model("registerSchema", registerSchema);

export default registerModel;