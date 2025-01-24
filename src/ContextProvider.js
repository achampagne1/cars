import React, { createContext, useState} from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [selectedMake, setSelectedMakeContext] = useState('none');
    const [selectedModel, setSelectedModelContext] = useState('none');
    const [selectedYear, setSelectedYearContext] = useState('none');


    return (
        <Context.Provider
            value={{
                selectedMake, 
                setSelectedMakeContext,
                selectedModel,
                setSelectedModelContext,
                selectedYear,
                setSelectedYearContext,
            }}
        >
            {children}
        </Context.Provider>
    );
};
