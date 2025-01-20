import './App.css';
import Dropdown from './components/Dropdown';
import Graph from "./components/Graph";
import { Amplify } from 'aws-amplify';
import { downloadData } from '@aws-amplify/storage';
import awsconfig from "./aws-exports";
import { useState, useEffect } from "react";
import { graphHelper } from "./helpers/GraphHelper";

Amplify.configure(awsconfig);

function App() {
    const [dataPoints, setDataPoints] = useState([]);
    const [bestFitCurve, setBestFitCurve] = useState([]);
    const [selectedOption, setSelectedOption] = useState('ghibli');

    const graphHandle = async (path) => {
        try {
            const downloadResult = await downloadData({ path: `${path}.json` }).result;
            const data = await downloadResult.body.text();
            const jsonData = JSON.parse(data);

            const { convertedData, curvePoints } = graphHelper(jsonData);
            setDataPoints(convertedData);
            setBestFitCurve(curvePoints);

        } catch (error) {
            console.error("Error fetching data from S3:", error);
        }
    };

    useEffect(() => {
        graphHandle(selectedOption);
    }, [selectedOption]);


    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="App">
            <h1>Graph Example</h1>
            <Dropdown options={["leaf", "ghibli", "levonte", "crv", "escape"]} onChange={handleSelect}/>
            <Graph dataPoints={dataPoints} bestFitCurve={bestFitCurve} />
        </div>
    );
}

export default App;