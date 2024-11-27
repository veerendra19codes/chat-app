import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { useUserContext } from '../contexts/userContext';
import { useSocketContext } from '../contexts/socketContext';
import { useSelectedUserContext } from '../contexts/selectedUserContext';
// import { v4 as uuid } from "uuid";

const Messages = ({ selectedUser, socket }) => {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [recievedMessage, setRecievedMessage] = useState("");
    // console.log("selectedUser:", selectedUser);
    const { userId } = useUserContext();
    // console.log("userId:", userId);
    const scrollRef = useRef();
    const { onlineUsers } = useSocketContext();

    const isOnline = onlineUsers && onlineUsers[selectedUser._id] ? true : false;

    const handleMessageSubmit = async () => {
        try {
            const body = {
                message,
                users: [selectedUser._id, userId],
                sender: userId,
            }
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send-message`, body);
            console.log('res:', res);

            socket.current.emit("send-msg", {
                to: selectedUser._id,
                from: userId,
                message,
            })

            const msgs = [...currentChat];
            console.log("msg.length before:", msgs.length);
            msgs.push({ _id: new Date().getTime(), message, sender: userId });
            // msgs.push(message);

            setCurrentChat(msgs);
            console.log("msg.length after:", msgs.length);



            // console.log("res from sendMessage:", res);
            setMessage("");
        } catch (error) {
            console.log("error sending message:", error);
            setMessage("");
        }
    }

    useEffect(() => {
        if (socket.current) {
            console.log("socket connection established")
            socket.current.on("msg-recieve", (msg) => {
                console.log("msg:", msg);
                const arrivedMessage = { _id: new Date().getTime(), message, sender: "" };
                console.log("arrivedMessage:", arrivedMessage);
                setRecievedMessage(arrivedMessage);
            })

            socket.current.on("online-users", (onlineUsers) => {
                console.log("onlineUsers:", onlineUsers);
            })

            // Clean up the event listener on unmount
            return () => {
                socket.current.off('msg-recieve');
                socket.current.off("online-users");
            };
        }
    }, [message, socket, userId])

    useEffect(() => {
        if (recievedMessage) {
            setCurrentChat((prev) => [...prev, recievedMessage])
        }
    }, [recievedMessage])

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    // }, [currentChat])

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-messages`);
                // console.log("res of getAllMessages:", res);


                if (res.status === 201) {
                    // const messages = res.data.allMessages;
                    // const chat-msgs = messages.filter((m) => m.users)
                    setAllMessages(res.data.allMessages);
                }
            } catch (error) {
                console.log("error getting all messages:", error);
            }
        }
        getAllMessages();
    }, [message, currentChat])

    useEffect(() => {
        const newMessage = async () => {
            // console.log("allMessages:", allMessages);
            const chat = allMessages.filter((m) => m.users.length === 2 &&
                m.users.includes(selectedUser._id) &&
                m.users.includes(userId));
            // console.log("chat:", chat);
            setCurrentChat(chat);
        }
        newMessage();
    }, [allMessages, selectedUser]);


    if (!selectedUser) {
        return (
            <div className="w-4/5 h-full bg-gray-600 flex justify-center items-center">Please select an user to chat</div>
        )
    }
    else {
        return (

            <div className="hidden sm:block w-full sm:w-4/5 h-full bg-gray-600 justify-between relative">
                <div className="flex gap-4 selectedUser h-12 py-2 justify-start align-bottom pl-4 bg-slate-700 text-white text-xl">
                    {selectedUser.username}{selectedUser._id === userId ? "(self)" : ""}
                    <p className="text-[10px]">{isOnline ? "online" : ""}</p>
                </div>
                <div className="chat p-4 h-[400px] bg-slate-900 flex flex-col gap-2 justify-start overflow-y-auto">
                    {currentChat?.map((c) => {
                        return (
                            <div ref={scrollRef} key={c._id} className={c.sender === userId ? "row flex w-full justify-end" : "row flex w-full justify-start"}>
                                <div className={c.sender === userId ? "message rounded-lg bg-green-700 w-auto p-2 whitespace-nowrap block max-w-fit text-end" : "message rounded-lg bg-green-500 w-auto p-2 whitespace-nowrap block max-w-fit text-end"}>
                                    {c?.message}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="input w-full flex items-center gap-4 px-4 bg-slate-800 h-12 py-2 bottom-0 absolute">
                    <input type="text" placeholder="type your message..." className="w-full h-full  bg-transparent border-[1px] border-gray-400 rounded text-white pl-4 outline-none" value={message} onChange={(e) => {
                        setMessage(e.target.value)
                        if (message) {
                            socket.current.emit("typing-users", (userId));
                        }
                        else {
                            socket.current.emit("not-typing-users", userId);
                        }
                    }} />
                    <button className="bg-green-500  hover:bg-green-400 rounded-2xl px-4 py-2" onClick={handleMessageSubmit}>Send</button>
                </div>
            </div>

        )
    }
}

export default Messages
