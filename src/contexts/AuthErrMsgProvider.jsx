import { createContext, useState } from "react";

const AuthErrMsgContext = createContext({});

export const AuthErrMsgProvider = ({ children }) => {
    const [authErrMsg, setAuthErrMsg] = useState('');

    return (
        <AuthErrMsgContext.Provider value={{ authErrMsg, setAuthErrMsg }}>
            {children}
        </AuthErrMsgContext.Provider>
    )
}

export default AuthErrMsgContext;