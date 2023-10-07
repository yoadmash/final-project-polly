import { createContext, useState } from "react";

const PollContext = createContext({});

export const PollProvider = ({ children }) => {
    const [poll, setPoll] = useState({});

    return (
        <PollContext.Provider value={{ poll, setPoll }}>
            {children}
        </PollContext.Provider>
    )
}

export default PollContext;