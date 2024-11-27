import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});

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
                    // console.log("res of user:", res);
                    setUserId(res.data.userId);
                    try {
                        const user = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/getSingleUser`,
                            { userId: res.data.userId },  {
                            headers: {
                                "Content-Type": "application/json",
                                "Authentication": token,
                            }
                        }); 
                    console.log("user:", user);
                    setUser(user.data[0])
                    } catch (error) {
                        console.log("error:", error);
                    }
                }
            } catch (err) {
                console.log("error in getting userId in userContext:", err);
                // navigate("/login");
            }
        };
        validateUser();
    }, []);

    return (
        <UserContext.Provider value={{userId, user}}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};
