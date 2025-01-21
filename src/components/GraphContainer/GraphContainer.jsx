import React from 'react';
import Graph from '../Graph';
import { downloadData } from '@aws-amplify/storage';
import { graphHelper } from "../../helpers/GraphHelper";
import { useState, useEffect } from "react";
import './GraphContainerStyle.css';

function GraphContainer({ selectedOption }) {
    const [dataPoints, setDataPoints] = useState([]);
    const [bestFitCurve, setBestFitCurve] = useState([]);

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


    return (
        <Graph dataPoints={dataPoints} bestFitCurve={bestFitCurve} />
    );
}

export default GraphContainer;
