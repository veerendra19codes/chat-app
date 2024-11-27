const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports.registerController = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        // console.log("req.body:", req.body);

        const exists = await Users.findOne({username});
        if(exists) {
            console.log("user with this username already exists")
            return res.status(203).json({message: "User with this username already exists"});
        }
        const existsEmail = await Users.findOne({email});
        if(existsEmail) {
            return res.status(203).json({message:"User with this email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            username, 
            email,
            password:hashedPassword,
        })
        console.log("newUser:",newUser);
        return res.status(201).json({message:"User successfully created, please login"})

    }
    catch(err) {
        next(err);
    }
}


module.exports.loginController = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        console.log("username:", username);

        const exists = await Users.findOne({username});
        console.log("exists:",exists);
        if(!exists) {
            return res.status(203).json({message:"User does not exists"});
        }

        const generateAuthToken = async() => {
            try{
                const generatedToken =  jwt.sign({_id:exists._id},process.env.KEY_SECRET,{
                    expiresIn: "1d",
                });
                console.log("generatedToken:", generatedToken);
                const updatedTokenUser = await Users.findOneAndUpdate({username}, {
                    token: generatedToken,
                    
                },{
                    new: true,
                })
                console.log("updatedToken:",updatedTokenUser);
                return generatedToken;
            }
            catch(err) {
                console.log("error:",err);
                return res.status(203).json({message:"try again later"})
            }
        }
        const token = await generateAuthToken();
        console.log("token:",token);
        
        return res.status(201).json({message:"login successful", token}).cookie("usercookie", token, {
            expires:new Date(Date.now()+900000),
            httpOnly: true,
        })
    } catch (error) {
        next(error);
    }
}

module.exports.validUser = async(req,res) => {
    try {
        const ValidUser = await Users.findById(req.userId);
        // console.log("validUser",ValidUser);

        res.status(201).json({message:"Authenticated", userId: ValidUser._id})
    } catch (error) {
        console.log("error in validUser:", error);
        res.status(203).json(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        // console.log("getting all users")
        const response = await Users.find({}, {password:0});
        // console.log("response:",response);
        if(response) {
            res.status(201).json(response);
        }
        else {
            res.status(203).json({message:"no users found"})
        }
        next();
    } catch (error) {
        console.log("error in getting all users:", error);
    }
}


module.exports.getSingleUser = async (req, res, next) => {
    try {
        console.log("req.body:", req.body);
        // console.log("getting all users")
        const response = await Users.find({
            _id: req.body.userId
        }, {password:0});
        // console.log("response:",response);
        if(response) {
            res.status(201).json(response);
        }
        else {
            res.status(203).json({message:"no users found"})
        }
        next();
    } catch (error) {
        console.log("error in getting all users:", error);
    }
}