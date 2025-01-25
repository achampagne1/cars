import React, { useContext } from 'react';
import { Context } from '../../ContextProvider'
import Graph from '../Graph';
import { graphHelper } from "../../helpers/GraphHelper";
import { useState, useEffect } from "react";
import { getFileFromS3 } from "../../helpers/GetFileFromS3";
import './GraphContainerStyle.css';

const GraphContainer =() => {
    const { selectedMake } = useContext(Context);
    const { selectedModel } = useContext(Context);
    const { selectedYear } = useContext(Context);

    const [dataPoints, setDataPoints] = useState([]);
    const [bestFitCurve, setBestFitCurve] = useState([]);
    const [fullCar, setFullCar] = useState('none_none_none');

    const graphHandle = async (path) => {
        const jsonData = await getFileFromS3(path);
        if (jsonData != null) { 
            const { convertedData, curvePoints } = graphHelper(jsonData);
            setDataPoints(convertedData);
            setBestFitCurve(curvePoints);
        }
    };

    useEffect(() => {
        const carIdentifier = `${selectedMake}_${selectedModel}_${selectedYear}`;
        setFullCar(carIdentifier);
        console.log(carIdentifier);
        if (carIdentifier !== 'none_none_none') {
            graphHandle(carIdentifier);
        }
    }, [selectedYear]);


    return (
        <div className="graph-container">
            <Graph dataPoints={dataPoints} bestFitCurve={bestFitCurve} />
            {fullCar === 'none_none_none' && (<div className="overlay">Select A Vehicle</div>)}
        </div>
    );
}

export default GraphContainer;
