import axios from 'axios';
import React, { useState } from 'react'
import { useUserContext } from '../contexts/userContext';
import { useSocketContext } from '../contexts/socketContext';
import GroupChatbox from '../components/GroupChatbox';

const Groups = () => {
    const [groupname, setGroupname] = useState("");
    const userId = useUserContext();
    console.log("userId:", userId);
    const socket = useSocketContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("groupname:", groupname);
            const body = {
                groupname,
                admin: userId,
            }
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/create-group`, body)
            console.log("res:", res);
            setGroupname("");
        } catch (error) {
            console.log("error in creating a new group:", error);
        }

    }

    return (
        <div className="bg-gray-900 flex flex-col justify-center items-center w-full min-h-screen">
            <form className="w-[400px] bg-slate-800 border-[1px] border-gray-300 flex flex-col p-4 gap-4 text-white justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
                Create a new group
                <input placeholder="group name" className="p-2 border-[1px] border-gray-300 bg-transparent text-white w-full" value={groupname} onChange={(e) => setGroupname(e.target.value)} />
                <button className="px-4 py-2 bg-blue-500 rounded-lg" type="submit">Create</button>
            </form>

            <GroupChatbox socket={socket} />
        </div>
    )
}

export default Groups
