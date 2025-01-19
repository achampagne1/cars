import './App.css';
import Dropdown from './components/Dropdown';
import Graph from "./components/Graph";
import { Amplify } from 'aws-amplify';
import { downloadData } from '@aws-amplify/storage';
import awsconfig from "./aws-exports";
import { useState, useEffect } from "react";
import { dataConverter } from "./helpers/DataConverter"

Amplify.configure(awsconfig);

function App() {
    const [dataPoints, setDataPoints] = useState([]);

    const fetchDataFromS3 = async () => {
        const downloadResult = await downloadData({path: 'ghibli.json',}).result;
        const data = await downloadResult.body.text();
        const jsonData = JSON.parse(data);
        setDataPoints(dataConverter(jsonData));
        console.log(dataPoints);
    };

    useEffect(() => {
        fetchDataFromS3();
    }, []);

    return (
        <div className="App">
            <h1>Graph Example</h1>
            <Graph dataPoints={dataPoints} />
        </div>
    );
}

export default App;
