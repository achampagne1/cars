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
    const [year1Options, setYear1Options] = useState([]);
    const [year2Options, setYear2Options] = useState([]);
    const [selectedYear1, setSelectedYear1] = useState("");
    const [selectedYear2, setSelectedYear2] = useState("");
    const [carModels, setCarModels] = useState([]);

    //context used by graph for getting the data
    const { setSelectedMakeContext } = useContext(Context);
    const { setSelectedModelContext } = useContext(Context);
    const { setSelectedYear1Context } = useContext(Context);
    const { setSelectedYear2Context } = useContext(Context);

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
        setYear1Options([]); 
        setYear2Options([]); 
        setSelectedYear1("");
        setSelectedYear2("");
    };

    const generateYearRange = (years) => {
        if (!years || years.length === 0) return [];
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setSelectedModelContext(model);
        const foundModel = carModels.find((option) => option.value === selectedMake)?.models.find((option) => option.name === model);
        setYear1Options(foundModel ? generateYearRange(foundModel.year) : []); 
        setSelectedYear1(""); 
        setSelectedYear2("");
    };


    const handleYear1Select = (year) => {
        setSelectedYear1(year);
        setSelectedYear1Context(year);
        const yearLimits = [+year, year1Options[year1Options.length-1]];
        setYear2Options(year ? generateYearRange(yearLimits) : []); 

        if (selectedYear2 === "") { 
            setSelectedYear2(year);
            setSelectedYear2Context(year);
        }
    };

    const handleYear2Select = (year) => {
        const yearLimits = [year1Options[0], +year];
        setYear1Options(year ? generateYearRange(yearLimits) : []); 
        setSelectedYear2(year);
        setSelectedYear2Context(year);
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

            {/* Dropdown for Year 1*/}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-year1"
                title={selectedYear1 || (year1Options.length > 0 ? "Select Year" : "No Years Available")}
                disabled={year1Options.length === 0}
                onSelect={handleYear1Select}
            >
                {year1Options.map((year, index) => (
                    <Dropdown.Item key={index} eventKey={year}>
                        {year}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {/* Dropdown for Year 2*/}
            <DropdownButton
                as={ButtonGroup}
                id="dropdown-year2"
                title={selectedYear2 || (year2Options.length > 0 ? "Select Year" : "No Years Available")}
                disabled={year2Options.length === 0}
                onSelect={handleYear2Select}
            >
                {year2Options.map((year, index) => (
                    <Dropdown.Item key={index} eventKey={year}>
                        {year}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
};

export default DropdownContainer;
