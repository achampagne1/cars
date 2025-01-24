import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './PopupContainerStyle.css';

const PopupContainer = () => {
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState('');

    useEffect(() => {
        // Fetch the privacy policy file from the public directory
        fetch('/privacypolicy.txt')
            .then(response => response.text()) // Read the text content of the file
            .then(text => setPrivacyPolicyContent(text)) // Update state with the file's content
            .catch(error => console.error('Error fetching privacy policy:', error)); // Handle errors
    }, []);

    return (
        <div className="PopupContainer">
            <Popup trigger={<button className="popup-button">Privacy Policy</button>} modal overlayClassName="popup-overlay">
                {close => (
                    <div className="popup-content">
                        <p>{privacyPolicyContent}</p>
                        <button onClick={close}>Close</button>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default PopupContainer;
