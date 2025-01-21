import React, { createContext, useState} from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [selectedMake, setSelectedMakeContext] = useState('Toyota');
    const [selectedModel, setSelectedModelContext] = useState('Camry');
    const [selectedYear, setSelectedYearContext] = useState('2018-2024');


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
