import React, { createContext, useState} from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [selectedMake, setSelectedMakeContext] = useState('none');
    const [selectedModel, setSelectedModelContext] = useState('none');
    const [selectedYear1, setSelectedYear1Context] = useState('none');
    const [selectedYear2, setSelectedYear2Context] = useState('none');
    const [services, setServices] = useState([]);
    const [issues, setIssues] = useState([]);


    return (
        <Context.Provider
            value={{
                selectedMake, 
                setSelectedMakeContext,
                selectedModel,
                setSelectedModelContext,
                selectedYear1,
                setSelectedYear1Context,
                selectedYear2,
                setSelectedYear2Context,
                services,
                setServices,
                issues,
                setIssues
            }}
        >
            {children}
        </Context.Provider>
    );
};
