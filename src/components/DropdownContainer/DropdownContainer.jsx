import React from "react";
import Dropdown from '../Dropdown';
import './DropdownContainerStyle.css';

const DropdownContainer = () => {
    return (
        <Dropdown options={["leaf", "ghibli", "levonte", "crv", "escape", "q8"]} />
    );
}

export default DropdownContainer;
