import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DropdownContainer from './components/DropdownContainer'
import { ContextProvider } from './ContextProvider';
import GraphContainer from "./components/GraphContainer";
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws-exports";
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

Amplify.configure(awsconfig);

const App = () => {
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState('');

    useEffect(() => {
        // Fetch the privacy policy file from the public directory
        fetch('/privacypolicy.txt')
            .then(response => response.text()) // Read the text content of the file
            .then(text => setPrivacyPolicyContent(text)) // Update state with the file's content
            .catch(error => console.error('Error fetching privacy policy:', error)); // Handle errors
    }, []);

    return (
        <ContextProvider>
            <div className="App">
                <div className="body">
                    <h1>Take the hassle out of buying a car</h1>
                    <div className="dropdown-container">
                        <DropdownContainer />
                    </div>
                    <div className="graph-container">
                        <GraphContainer dataPoints />
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <Popup trigger={<button className="popup-button">Privacy Policy</button>} modal >
                            {close => (
                                <div className="popup-content">
                                    <p>{privacyPolicyContent}</p>
                                    <button onClick={close}>Close</button>
                                </div> 
                            )}
                        </Popup>
                    </div>
                    <p>&copy; 2025 Auto Hassle. All rights reserved.</p>
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
