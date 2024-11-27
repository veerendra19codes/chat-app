import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/userContext';
import axios from 'axios';
import { LogOut } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("location:", location);
    // const [username, setUsername] = useState("");

    const { userId, user } = useUserContext();
    console.log("userId in navbar:", userId);


    const handleLogout = () => {
        localStorage.removeItem("userToken");
        // setUsername("");
        navigate("/login")
    }


    // useEffect(() => {
    //     const getUsername = async () => {
    //         try {
    //             if (userId) {
    //                 const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
    //                 if (res.status === 201) {
    //                     // console.log("res of gettig username", res)
    //                     const currentUser = res.data.filter((u) => u._id === userId);
    //                     // console.log("user object:", currentUser[0].username);
    //                     setUsername(currentUser[0].username);
    //                 }
    //             }
    //         } catch (error) {
    //             console.log("error in getting username:", error);
    //         }
    //     }
    //     getUsername();
    // }, [userId])

    const toastOptions = {
        position: "top-right",
        theme: 'dark',
    }

    // useEffect(() => {
    //     if (username) {
    //         toast.success(`welcome ${username}`, toastOptions);
    //     }
    // }, [username])

    const list = [
        {
            id: 1,
            name: 'chat',
            path: '/',
        },
        // {
        //     id: 2,
        //     name: 'groups',
        //     path: '/groups',
        // },
    ]


    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <>
            <div className="h-16 w-full shadow-2xl flex px-4 lg:px-12 bg-slate-700 items-center justify-between">
                <div className="logo font-black text-lg lg:text-3xl text-blue-500">ChatBudd</div>
                <menu className="flex gap-4">
                    {list.map((l) => {
                        return (
                            <Link key={l.id} to={l.path} className="hover:underline username text-white text-sm lg:text-lg">{l.name}</Link>
                        )
                    })}
                </menu>
                <div className="logout flex gap-4 items-center">
                    {user && user.username && <div className="username text-white text-sm lg:text-lg">Hi {user.username}</div>}
                    <button className="bg-red-500 hover:bg-red-400 rounded px-2 sm:px-4 py-2 text-white flex items-center gap-4" onClick={handleLogout}><span className="hidden sm:block">Log out</span><LogOut fontSize={4} /></button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Navbar

