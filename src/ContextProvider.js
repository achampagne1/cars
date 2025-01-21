import React, { createContext, useState} from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState('ghibli');


    return (
        <Context.Provider
            value={{
                selectedOption, 
                setSelectedOption
            }}
        >
            {children}
        </Context.Provider>
    );
};
