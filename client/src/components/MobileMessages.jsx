import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { useUserContext } from '../contexts/userContext';
import { useSelectedUserContext } from '../contexts/selectedUserContext';
import { useNavigate } from 'react-router-dom';
import { useSocketContext } from '../contexts/socketContext';
const MobileMessages = () => {
    const { socket } = useSocketContext();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [recievedMessage, setRecievedMessage] = useState("");
    const { selectedUser } = useSelectedUserContext();
    // console.log("selectedUser:", selectedUser);
    const userId = useUserContext();
    // console.log("userId:", userId);
    const scrollRef = useRef();

    const handleMessageSubmit = async () => {
        try {
            const body = {
                message,
                users: [selectedUser._id, userId],
                sender: userId,
            }
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send-message`, body);

            socket.current.emit("send-msg", {
                to: selectedUser._id,
                from: userId,
                message,
                users: [userId, selectedUser._id],
                sender: userId,
            })

            const msgs = [...currentChat];
            console.log("msg.length before:", msgs.length);
            msgs.push({ _id: new Date().getTime(), message, sender: userId, users: [userId, selectedUser._id] });
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
        if (socket?.current) {
            console.log("socket connection established")
            socket.current.on("msg-recieve", (msg) => {
                console.log("msg:", msg);
                const arrivedMessage = { _id: new Date().getTime(), message: msg, sender: selectedUser._id, users: [userId, selectedUser._id] };
                console.log("arrivedMessage:", arrivedMessage);
                setRecievedMessage(arrivedMessage);
            })

            // Clean up the event listener on unmount
            return () => {
                socket.current.off('msg-recieve');
            };
        }
    }, [])

    useEffect(() => {
        if (recievedMessage) {
            console.log("recieved message:", recievedMessage);
            setCurrentChat((prev) => [...prev, recievedMessage])
        }
    }, [recievedMessage])

    useEffect(() => {
        console.log("currentChat:", currentChat);
    }, [currentChat]);

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
            setCurrentChat("");
            setCurrentChat(chat);
        }
        newMessage();
    }, [allMessages, selectedUser]);

    useEffect(() => {
        if (!selectedUser._id) {
            navigate("/");
        }
    }, [])

    const splitMessage = (message, length) => {
        const parts = [];
        for (let i = 0; i < message.length; i += length) {
            parts.push(message.slice(i, i + length));
        }
        return parts;
    }


    if (!selectedUser) {
        return (
            <div className="w-4/5 h-full bg-gray-600 flex justify-center items-center">Please select an user to chat</div>
        )
    }
    else {
        return (

            <div className="w-full h-[570px] bg-gray-600 justify-between relative">
                <div className="selectedUser h-[50px] py-2 justify-start pl-4 bg-gray-900 text-white text-xl">
                    {selectedUser.username}{selectedUser._id === userId ? "(self)" : ""}
                </div>
                <div className="chat p-2 h-[470px] bg-green-900 flex flex-col gap-2 justify-start overflow-y-auto">
                    {currentChat.map((c) => {
                        return (
                            <div ref={scrollRef} key={c._id} className={c.sender === userId ? "row flex w-full justify-end" : "row flex justify-start overflow-x-hidden w-full"}>
                                <div className={c.sender === userId ? "message rounded-lg bg-green-700 w-auto p-2 whitespace-nowrap block max-w-fit text-end text-white" : "message rounded-lg bg-green-500 w-auto p-2 whitespace-nowrap block max-w-fit text-end text-white"}>
                                    {/* {c?.message} */}
                                    {splitMessage(c.message, 20).map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="input w-full flex items-center gap-4 px-4 bg-slate-700 h-12 py-2 bottom-0 absolute">
                    <input type="text" placeholder="type your message..." className="w-full h-full  bg-transparent border-[1px] border-gray-400 rounded text-white pl-4 outline-none" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button className="bg-blue-500 text-white hover:bg-blue-400 rounded-2xl px-4 py-2" onClick={handleMessageSubmit}>Send</button>
                </div>
            </div>

        )
    }
}

export default MobileMessages
