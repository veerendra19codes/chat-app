import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/userContext';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("location:", location);
    const [username, setUsername] = useState("");



    const handleLogout = () => {
        localStorage.removeItem("userToken");
        navigate("/login")
    }

    const userId = useUserContext();

    useEffect(() => {
        const getUsername = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
                if (res.status === 201) {
                    // console.log("res of gettig username", res)
                    const currentUser = res.data.filter((u) => u._id === userId);
                    // console.log("user object:", currentUser[0].username);
                    setUsername(currentUser[0].username);
                }
            } catch (error) {
                console.log("error in getting username:", error);
            }
        }
        getUsername();
    }, [userId])


    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <div className="h-16 w-full shadow-2xl flex px-12 bg-slate-700 items-center justify-between">
            <div className="logo font-black text-3xl text-blue-500">ChatBudd</div>
            <div className="logout flex gap-4 items-center">
                <div className="username text-white">Hi {username || ""}</div>
                <button className="bg-red-500 hover:bg-red-400 rounded px-4 py-2 text-white" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default Navbar
