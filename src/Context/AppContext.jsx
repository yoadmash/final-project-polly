import React, { createContext, useState } from 'react';

const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const [options, setOptions] = useState([
        { id: 1, title: 'Text', type: 'text', icon: '' },
        { id: 2, title: 'Multiple Choices', type: 'radio', icon: '' },
        { id: 3, title: 'Checkboxes', type: 'checkbox', icon: '' },
    ]);


    return (
        <AppContext.Provider
            value={{
                options,
                setOptions,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
