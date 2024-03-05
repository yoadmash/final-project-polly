import { createContext, useState } from "react";

const AdminPanelContext = createContext({});

export const AdminPanelProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const setUser = (userId, updatedUser) => {
        setUsers(prev => prev.map(user => user._id === userId ? updatedUser : user));
    }

    return (
        <AdminPanelContext.Provider
            value={{
                users, setUsers, setUser,
            }}
        >
            {children}
        </AdminPanelContext.Provider>
    )
}

export default AdminPanelContext;