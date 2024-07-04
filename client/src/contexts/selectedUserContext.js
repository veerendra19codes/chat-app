import React, { useState, createContext, useContext } from 'react';
const SelectedUserContext = createContext();

export const SelectedUserContextProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState({});

    return (
        <SelectedUserContext.Provider value={{selectedUser, setSelectedUser}}>
            {children}
        </SelectedUserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useSelectedUserContext = () => {
    return useContext(SelectedUserContext);
};
