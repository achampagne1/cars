import './App.css';
import Dropdown from './components/Dropdown';
import Graph from "./components/Graph";
import { Amplify } from 'aws-amplify';
import { downloadData } from '@aws-amplify/storage';
import awsconfig from "./aws-exports";
import { useState, useEffect } from "react";
import { dataConverter } from "./helpers/DataConverter";
import { PolynomialRegression } from 'ml-regression-polynomial';

Amplify.configure(awsconfig);

function App() {
    const [dataPoints, setDataPoints] = useState([]);
    const [bestFitCurve, setBestFitCurve] = useState([]);
    const [selectedOption, setSelectedOption] = useState('ghibli');

    const fetchDataFromS3 = async (path) => {
        try {
            const downloadResult = await downloadData({ path: `${path}.json` }).result;
            const data = await downloadResult.body.text();
            const jsonData = JSON.parse(data);

            // Convert data and set to state
            const convertedData = dataConverter(jsonData);
            setDataPoints(convertedData);

            // Perform polynomial regression
            const regression = new PolynomialRegression(
                convertedData.map(point => point.x),
                convertedData.map(point => point.y),
                5
            );

            // Generate a smooth curve
            const xValues = convertedData.map(point => point.x);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const curvePoints = [];

            for (let x = minX; x <= maxX; x += (maxX - minX) / 500) {
                const y = regression.predict(x);
                curvePoints.push({ x, y });
            }

            setBestFitCurve(curvePoints);
        } catch (error) {
            console.error("Error fetching data from S3:", error);
        }
    };

    useEffect(() => {
        fetchDataFromS3(selectedOption);
    }, [selectedOption]);

    // Define the handleSelect function
    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="App">
            <h1>Graph Example</h1>
            <Dropdown
                options={["leaf", "ghibli","levonte"]}
                onChange={handleSelect} // Use the dedicated handleSelect function
            />
            <Graph dataPoints={dataPoints} bestFitCurve={bestFitCurve} />
        </div>
    );
}

export default App;