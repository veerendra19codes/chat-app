import React, { useEffect, createContext, useContext, useRef, useState} from 'react';
import { io } from "socket.io-client"
import { useUserContext } from './userContext';
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState({});
    const [typingUsers, setTypingUsers] = useState({});
    const {userId }= useUserContext();

    useEffect(() => {
        if (userId) {
            socket.current = io(process.env.REACT_APP_BACKEND_URL);
            socket.current.emit("add-user", userId);
            // Listen for updated online users from the backend
            socket.current.on("online-users", (onlineUsers) => {
                console.log("Received onlineUsers:", onlineUsers);
                setOnlineUsers(onlineUsers); // Update the state
            });

            socket.current.on("typing-users", (typingUsers) => {
                console.log("Received typingUsers:", typingUsers);
                setTypingUsers(typingUsers); // Update the state
            });

            // Cleanup on unmount or when `userId` changes
            return () => {
                socket.current.disconnect();
                setOnlineUsers({});
                setTypingUsers({}); // Clear online users on disconnect
            };
        }
    }, [userId])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, typingUsers}}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useSocketContext = () => {
    return useContext(SocketContext);
};
