import React, { useEffect } from 'react'
import Chatbox from '../components/Chatbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocketContext } from '../contexts/socketContext';

function Chat() {
    const socket = useSocketContext();

    const navigate = useNavigate();
    useEffect(() => {
        const validateUser = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/validUser`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authentication": token,
                    }
                });

                if (res.status !== 201) {
                    navigate("/login");
                    return;
                }
                // setUserId(res.data.userId);
            } catch (err) {
                console.log("error in chat:", err);
                navigate("/login");
            }
        };
        validateUser();
    }, [navigate]);

    return (
        <div className="flex justify-center items-start bg-gray-900 min-h-screen w-full text-white">
            <Chatbox socket={socket} />
        </div>
    )
}

export default Chat
