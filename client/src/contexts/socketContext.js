import React, { useEffect, createContext, useContext, useRef} from 'react';
import { io } from "socket.io-client"
import { useUserContext } from './userContext';
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const socket = useRef();

    const userId = useUserContext();

    useEffect(() => {
        if (userId) {
            socket.current = io(process.env.REACT_APP_BACKEND_URL);
            socket.current.emit("add-user", userId);
        }
    }, [userId])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useSocketContext = () => {
    return useContext(SocketContext);
};
