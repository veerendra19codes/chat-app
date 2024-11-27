import React, { useState } from 'react'
import Contacts from './Contacts'
import Messages from './Messages'
import MobileContacts from './MobileContacts';
import { useUserContext } from '../contexts/userContext';
import Groups from '../pages/Groups';

export default function GroupChatbox({ socket }) {
    const [selectedGroup, setSelectedGroup] = useState({});
    const { userId } = useUserContext();

    return (
        <>
            <div className="hidden w-full sm:w-4/5 h-full sm:h-[500px] sm:my-12 sm:flex flex-col sm:flex-row justify-center items-start border-[1px] border-slate-600 overflow-hidden">
                <Groups selectedGroup={selectedGroup} setSelectedUser={setSelectedGroup} />
                <Messages selectedUser={selectedGroup} userId={userId} socket={socket} />
            </div>

            {/* mobile */}
            <div className="w-full sm:w-4/5 h-full sm:h-[500px] sm:my-12 flex flex-col sm:flex-row justify-center items-start border-[1px] border-slate-600 overflow-hidden sm:hidden">
                <MobileContacts socket={socket} />
            </div>
        </>
    )
}
