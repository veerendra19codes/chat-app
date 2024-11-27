const messageModel = require("../models/messageModel");

module.exports.sendMessage = async(req, res, next) => {
    try {   
        // console.log("req.body:", req.body);
        const {message, users, sender} = req.body;
        const newMessage = await messageModel.create({
            message,
            users,
            sender,
        })
        // console.log("message:", newMessage);
        return res.status(201).json({message:"succeess"})
    } catch (error) {
        console.log("error in sending message:",error);
        next(error);
    }
}

module.exports.getMessages = async(req, res, next) => {
    try {   
        const allMessages = await messageModel.find()
        // console.log("allmessages:", allMessages);
        return res.status(201).json({message:"succeess", allMessages})
    } catch (error) {
        console.log("error in getting all message:",error);
        next(error);
    }
}