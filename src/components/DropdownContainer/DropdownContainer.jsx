import React, { useState, useContext } from "react";
import { Context } from '../../ContextProvider'
import './DropdownContainerStyle.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownContainer = () => {
    // States for selected values
    const [selectedMake, setSelectedMake] = useState("");
    const [modelOptions, setModelOptions] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const { setSelectedMakeContext } = useContext(Context);
    const { setSelectedModelContext } = useContext(Context);
    const { setSelectedYearContext } = useContext(Context);

    // Define options for "Make" and "Year"
    const makeOptions = [
        { value: "Toyota", models: ["Corolla", "Camry", "RAV4"] },
        { value: "Honda", models: ["Civic", "Accord", "CR-V"] },
        { value: "Ford", models: ["F-150", "Escape", "Explorer"] },
    ];
    const yearOptions = ["2021", "2022", "2023"];

    // Handle selecting a "Make"
    const handleMakeSelect = (make) => {
        setSelectedMake(make); // Update selected make
        setSelectedMakeContext(make);
        const foundMake = makeOptions.find((option) => option.value === make);
        setModelOptions(foundMake ? foundMake.models : []); // Update model options
        setSelectedModel(""); // Reset model selection
        setSelectedYear(""); // Reset year selection
    };

    // Handle selecting a "Model"
    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setSelectedModelContext(model);
    };

    // Handle selecting a "Year"
    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setSelectedYearContext(year);
    };

    return (
        <div>
            {/* Dropdown for Make */}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-make"
                title={selectedMake || "Select Make"}
                onSelect={handleMakeSelect}
            >
                {makeOptions.map((make) => (
                    <Dropdown.Item key={make.value} eventKey={make.value}>
                        {make.value}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {/* Dropdown for Model */}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-model"
                title={selectedModel || (modelOptions.length > 0 ? "Select Model" : "No Models Available")}
                disabled={modelOptions.length === 0}
                onSelect={handleModelSelect}
            >
                {modelOptions.map((model, index) => (
                    <Dropdown.Item key={index} eventKey={model}>
                        {model}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {/* Dropdown for Year */}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-year"
                title={selectedYear || "Select Year"}
                onSelect={handleYearSelect}
            >
                {yearOptions.map((year, index) => (
                    <Dropdown.Item key={index} eventKey={year}>
                        {year}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
};

export default DropdownContainer;
