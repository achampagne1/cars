import React from "react";
import Dropdown from '../Dropdown';
import './DropdownContainerStyle.css';

function DropdownContainer({ options, onChange }) { 

    return (
        <Dropdown options={options} onChange={onChange} />
    );
}

export default DropdownContainer;
