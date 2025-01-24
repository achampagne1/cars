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

    const graphHandle = async (path) => {
        const jsonData = await getFileFromS3(path);
        if (jsonData != null) { 
            const { convertedData, curvePoints } = graphHelper(jsonData);
            setDataPoints(convertedData);
            setBestFitCurve(curvePoints);
        }
    };

    useEffect(() => {
        const fullCar = selectedMake + selectedModel + selectedYear;
        if (fullCar !== 'nonenonenone') {
            graphHandle(fullCar);
        }
    }, [selectedYear]);


    return (
        <Graph dataPoints={dataPoints} bestFitCurve={bestFitCurve} />
    );
}

export default GraphContainer;
