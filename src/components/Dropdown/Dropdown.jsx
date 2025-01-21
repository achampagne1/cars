import React, { useState, useContext } from "react";
import { Context} from '../../ContextProvider'
import "./DropdownStyle.css";

const Dropdown = ({ options}) =>{ // Accept options and onChange as props
    const [isOpen, setIsOpen] = useState(false);
    const { setSelectedOption } = useContext(Context);

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
                                setSelectedOption(option);
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
