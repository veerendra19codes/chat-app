import React, { useState } from 'react'
import Contacts from './Contacts'
import Messages from './Messages'
import { useUserContext } from '../contexts/userContext';

export default function Chatbox({ socket }) {
    const [selectedUser, setSelectedUser] = useState({});
    const userId = useUserContext();

    return (
        <div className="w-4/5 h-[500px] my-12 flex justify-center items-start border-[1px] border-slate-600 overflow-hidden">
            <Contacts selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <Messages selectedUser={selectedUser} userId={userId} socket={socket} />
        </div>
    )
}
