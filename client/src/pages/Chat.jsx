import React, { useEffect, useRef } from 'react'
import Chatbox from '../components/Chatbox';
import { io } from "socket.io-client"
import { useUserContext } from '../contexts/userContext';

function Chat() {
    const socket = useRef();
    const userId = useUserContext();

    useEffect(() => {
        if (userId) {
            socket.current = io(process.env.REACT_APP_BACKEND_URL);
            socket.current.emit("add-user", userId);
        }
    }, [userId])

    return (
        <div className="flex justify-center items-start bg-gray-900 min-h-screen w-full text-white">
            <Chatbox socket={socket} />
        </div>
    )
}

export default Chat
