const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required: true,
        unique: true,
    },
    email: {
        type:String, 
        required: true,
        unique: true,
    },
    password: {
        type:String, 
        required: true,
        unique: true,
    },
    token:{
        type: String,
    }
}, {timestamps: true})


module.exports = mongoose.model("Users", userSchema);