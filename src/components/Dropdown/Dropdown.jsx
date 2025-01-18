import React, { useState } from "react";
import "./DropdownStyle.css"; 

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                Select Option
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li className="dropdown-item">Option 1</li>
                    <li className="dropdown-item">Option 2</li>
                    <li className="dropdown-item">Option 3</li>
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
