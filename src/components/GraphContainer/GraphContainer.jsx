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
    const [carData, setCarData] = useState(null);
    const [fullCar, setFullCar] = useState('none_none');

    const graphHandle = (filteredData) => {
        const { convertedData, curvePoints } = graphHelper(filteredData);
        setDataPoints(convertedData);
        setBestFitCurve(curvePoints);
    };

    const getUniqueEntries = (array, numEntries) => {
        const uniqueArray = Array.from(new Set(array));
        const shuffledArray = uniqueArray.sort(() => 0.5 - Math.random());
        return shuffledArray.slice(0, numEntries);
    }

    useEffect(() => {
        const carIdentifier = `${selectedMake}_${selectedModel}`;
        setFullCar(carIdentifier);
        if (carIdentifier !== 'none_none') {
            const fetchJsonData = async () => {
                const jsonData = await getFileFromS3(carIdentifier);
                setCarData(jsonData)
            }

            fetchJsonData();
        }
    }, [selectedModel]);

    useEffect(() => {
        if (carData != null) {
            const filteredData = [];
            for (let i = 0; i < carData.length; i++) {
                if (carData[i][0] === +selectedYear) {
                    filteredData.push(carData[i]);
                }
                if (carData[i][0] > selectedYear) {
                    break;
                }
            }
            console.log(filteredData.length)
            //graphHandle(getUniqueEntries(filteredData,1000));
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
