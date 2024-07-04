const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authentication;
        // console.log("token in middleware:", token);

        if(!token) {
            // console.log("token not found in middleware")
            return res.status(203).json({message:"No user found"})
        }

        const verifyToken = jwt.verify(token, process.env.KEY_SECRET);
        // console.log("verifyToken:", verifyToken);

        const rootUser = await Users.findById(verifyToken);

        if(!rootUser) {
            // console.log("token found but invalid user")
            return res.status(203).json({message:"No user found"})
        }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userId = verifyToken._id;

        next();
    } catch (error) {
        // console.log("error in middleware:",error);
        return res.status(203).json({message:"Invalid token"})
    }
}

module.exports = authenticate