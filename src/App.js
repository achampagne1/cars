import './App.css';
import DropdownContainer from './components/DropdownContainer'
import GraphContainer from "./components/GraphContainer";
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws-exports";
import { useState} from "react";


Amplify.configure(awsconfig);

function App() {
    const [selectedOption, setSelectedOption] = useState('ghibli');

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="App">
            <h1>Graph Example</h1>
            <DropdownContainer options={["leaf", "ghibli", "levonte", "crv", "escape","q8"]} onChange={handleSelect}/>
            <GraphContainer dataPoints selectedOption={selectedOption} />
        </div>
    );
}

export default App;