import { createContext, useState } from "react";

const AdminPanelErrContext = createContext({});

export const AdminPanelErrProvider = ({ children }) => {
    const [adminPanelErrMsg, setAdminPanelErrMsg] = useState('');

    const showAdminPanelErrMsg = (err_msg) => {
        setAdminPanelErrMsg(err_msg);
        setTimeout(() => {
            setAdminPanelErrMsg('')
        }, 3000)
    }

    return (
        <AdminPanelErrContext.Provider value={{ adminPanelErrMsg, showAdminPanelErrMsg }}>
            {children}
        </AdminPanelErrContext.Provider>
    )
}

export default AdminPanelErrContext;