import React, { useState, useContext, useEffect } from "react";
import { Context } from '../../ContextProvider';
import { getFileFromS3 } from "../../helpers/GetFileFromS3";
import './DropdownContainerStyle.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownContainer = () => {
    //states
    const [selectedMake, setSelectedMake] = useState("");
    const [modelOptions, setModelOptions] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [carModels, setCarModels] = useState([]);

    //context used by graph for getting the data
    const { setSelectedMakeContext } = useContext(Context);
    const { setSelectedModelContext } = useContext(Context);
    const { setSelectedYearContext } = useContext(Context);

    //grabs CarModels from the bucket
    useEffect(() => {
        const fetchCarModels = async () => {
            const models = await getFileFromS3("CarModels");
            setCarModels(models || []);
        };

        fetchCarModels();
    }, []); 


    const handleMakeSelect = (make) => {
        setSelectedMake(make);
        setSelectedMakeContext(make);
        const foundMake = carModels.find((option) => option.value === make);
        setModelOptions(foundMake ? foundMake.models : []); 
        setSelectedModel(""); 
        setYearOptions([]); 
        setSelectedYear("");
    };


    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setSelectedModelContext(model);
        const foundModel = carModels.find((option) => option.value === selectedMake)?.models.find((option) => option.name === model);
        setYearOptions(foundModel ? foundModel.year : []); 
        setSelectedYear(""); 
    };


    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setSelectedYearContext(year);
    };

    return (
        <div className="DropdownContainer">
            {/* Dropdown for Make */}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-make"
                title={selectedMake || "Select Make"}
                onSelect={handleMakeSelect}
            >
                {carModels.map((make) => (
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
                    <Dropdown.Item key={index} eventKey={model.name}>
                        {model.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {/* Dropdown for Year */}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-year"
                title={selectedYear || (yearOptions.length > 0 ? "Select Year" : "No Years Available")}
                disabled={yearOptions.length === 0}
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
