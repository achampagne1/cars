import React, { useState } from "react";
import "./DropdownStyle.css";

function Dropdown({ options, onChange }) { // Accept options and onChange as props
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
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                onChange({ target: { value: option } }); // Simulate a change event
                                setIsOpen(false); // Close dropdown after selection
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
