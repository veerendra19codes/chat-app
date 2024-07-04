import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState("");


    useEffect(() => {
        const validateUser = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    // navigate("/login");
                    return;
                }

                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/validUser`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authentication": token,
                    }
                });

                if (res.status !== 201) {
                    // navigate("/login");
                    return;
                }
                else {
                    setUserId(res.data.userId);
                }
            } catch (err) {
                console.log("error in getting userId in userContext:", err);
                // navigate("/login");
            }
        };
        validateUser();
    }, []);

    return (
        <UserContext.Provider value={userId}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};
