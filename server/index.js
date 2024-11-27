const express  =  require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute= require("./routes/authRoute")
const usersRoute = require("./routes/usersRoute")
const messageRoute = require("./routes/messageRoute")
const groupRoute = require("./routes/groupRoute")

require("dotenv").config();
const socket = require("socket.io")

const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/send-message", messageRoute);
app.use("/api/get-messages", messageRoute);
app.use("/api/create-group", groupRoute )


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
global.typingUsers = new Map();

io.on("connection", (socket) => {
    //when some user comes online we add its userId(db) and current socketId in global map(onlineUsers)
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        
        onlineUsers.set(userId, socket.id);
        console.log("onlineUsers:",onlineUsers);
        const onlineUsersObject  = Object.fromEntries(onlineUsers)
        console.log("userid and socket.id:", userId, socket.id);
        console.log("onlineUsersObject:", onlineUsersObject);

       io.emit("online-users", onlineUsersObject);
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
            console.log("data.message:",data.message);
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })

    socket.on("typing-users", (userId) => {
        typingUsers.set(userId, true);
        io.emit("typing-users", )
    })
    socket.on("not-typing-users", (userId) => {
        typingUsers.delete(userId);
    })

    // Remove user from online users map when they disconnect
    socket.on("disconnect", () => {
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                typingUsers.delete(userId);
                console.log(`User disconnected: ${userId}`);
                break;
            }
        }

        // Notify all users of the updated online users list
        const onlineUsersObject = Object.fromEntries(onlineUsers);
        const typingUsersObject = Object.fromEntries(typingUsers);
        io.emit("online-users", onlineUsersObject);
        io.emit("typing-users", typingUsersObject);
    });
})