const express  =  require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute= require("./routes/authRoute")
const usersRoute = require("./routes/usersRoute")
const messageRoute = require("./routes/messageRoute")
require("dotenv").config();
const socket = require("socket.io")

const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/send-message", messageRoute);
app.use("/api/get-messages", messageRoute);


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected"))
.catch((err) => console.log("error in connecting db:",err));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
})

//global variable for all online users at present time
global.onlineUsers = new Map();

io.on("connection", (socket) => {
    //when some user comes online we add its userId(db) and current socketId in global map(onlineUsers)
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("onlineUsers:",onlineUsers);
    })

    //whenever some one sends msg, it inludes data , from and to
    socket.on("send-msg", (data) => {
        console.log("data:",data);
        //sendUserSocket stores recievers socketId, which it gets from the onlineUsers map with the help of its userId which is coming from data.to
        const sendUserSocket = onlineUsers.get(data.to);
        console.log("reciever socket:",sendUserSocket);

        //if that socketId(receiver) is online, emit a function msg-recieve , i.e. update the chat and store the chat in db, etc
        if(sendUserSocket) {
            console.log("emited recive msg")
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})