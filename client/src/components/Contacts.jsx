import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSocketContext } from '../contexts/socketContext';

const Contacts = ({ selectedUser, setSelectedUser }) => {
    const [users, setUsers] = useState([]);
    const { onlineUsers } = useSocketContext();
    console.log("onlineUsers:", onlineUsers);

    useEffect(() => {
        console.log("users:", users);
        console.log("onlineUsers:", onlineUsers);
    }, [users, onlineUsers])

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
                // console.log("res of getAllUsers:", res);
                if (res.status === 201) {
                    setUsers(res.data);
                }
                else {
                    // console.log("response:", res.message);
                }
            } catch (error) {
                console.log("error in getting all users:", error);
            }
        }
        getAllUsers();
    }, [])
    return (
        <div className="contacts border-r-2 border-slate-700 w-full sm:w-1/5 min-h-screen sm:h-full sm:flex flex-col justify-start items-center">

            <div className="title text-blue-400 text-lg sm:text-3xl text-center w-full sm:py-4">Contacts</div>
            <div className="w-full h-full flex flex-col justify-start items-center px-2 overflow-x-hidden overflow-y-auto">
                {users?.map((u) => {
                    // Safely access onlineUsers object and check if the user is online
                    const isOnline = onlineUsers && onlineUsers[u._id] ? true : false;  // If online, the userId will be a key in onlineUsers object

                    return (
                        <div key={u._id} className={selectedUser.username === u.username ? `user m-1 bg-blue-700 hover:bg-blue-600 flex justify-start gap-2 items-center p-2 w-full rounded-lg` : `user m-1 bg-blue-800 hover:bg-blue-600 flex justify-start gap-2 items-center p-2 w-full rounded-lg`} onClick={() => setSelectedUser(u)}>
                            <div className="avatar size-8 rounded-full bg-gray-500 text-white flex justify-center items-center uppercase text-xl">
                                {u.username[0]}
                            </div>

                            <div className="flex flex-col username text-left align-middle">
                                {u.username}
                                <p className="text-[10px]">{isOnline ? "online" : ""}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Contacts
