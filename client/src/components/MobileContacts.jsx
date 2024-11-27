import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelectedUserContext } from '../contexts/selectedUserContext';

const MobileContacts = () => {
    const { selectedUser, setSelectedUser } = useSelectedUserContext();
    // console.log("value:", value);
    const navigate = useNavigate();
    // const [selectedUser, setSelectedUser] = useState({});
    const [users, setUsers] = useState([]);
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

    const handleSelectedUser = (u) => {
        console.log("u:", u);
        setSelectedUser(u);
        navigate("/mobile-chat")
    }
    // useEffect(() => {
    //     console.log("selectedUser inside useEffect:", selectedUser);
    // }, [selectedUser])
    return (
        <div className="contacts w-full sm:w-1/5 min-h-screen sm:h-full sm:flex flex-col justify-start items-center">

            <div className="title text-blue-400 text-lg sm:text-3xl text-center w-full sm:py-4">Contacts</div>
            <div className="w-full h-full flex flex-col justify-start items-center px-2 overflow-x-hidden overflow-y-auto">
                {users?.map((u) => {
                    return (
                        <div key={u._id} className={selectedUser.username === u.username ? `user m-1 bg-blue-700 hover:bg-blue-600 flex justify-start gap-2 items-center p-2 w-full rounded-lg` : `user m-1 bg-blue-800 hover:bg-blue-600 flex justify-start gap-2 items-center p-2 w-full rounded-lg`} onClick={() => handleSelectedUser(u)}>
                            <div className="avatar size-8 rounded-full bg-gray-500 text-white flex justify-center items-center uppercase text-xl">
                                {u.username[0]}
                            </div>
                            <div className="username text-left align-middle">
                                {u.username}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileContacts
