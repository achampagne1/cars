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
    const { selectedYear1 } = useContext(Context);
    const { selectedYear2 } = useContext(Context);
    const { setServices } = useContext(Context);
    const { setIssues } = useContext(Context);

    const [usedCarData, setUsedCarData] = useState([]);
    const [newCarData, setNewCarData] = useState([]);
    const [bestFitCurve, setBestFitCurve] = useState([]);
    const [carData, setCarData] = useState(null);
    const [fullCar, setFullCar] = useState('none_none');

    const graphHandle = (filteredData) => {
        const { convertedData, curvePoints } = graphHelper(filteredData);
        const { newCar, usedCar } = convertedData.reduce(
            (acc, item) => {
                if (item.x === 0) {
                    acc.newCar.push(item); 
                } else {
                    acc.usedCar.push(item); 
                }
                return acc;
            },
            { newCar: [], usedCar: [] } 
        );
        setUsedCarData(usedCar);
        setNewCarData(newCar);
        setBestFitCurve(curvePoints);
    };

    const getUniqueEntries = (array, numEntries) => {
        const uniqueArray = Array.from(new Set(array));
        const shuffledArray = uniqueArray.sort(() => 0.5 - Math.random());
        return shuffledArray.slice(0, numEntries);
    }

    const generateYearRange = (years) => {
        if (!years || years.length === 0) return [];
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    };

    const removeOutliers = (data) => {
        // Define mileage bin size (e.g., 5000-mile intervals)
        const binSize = 5000;
        let mileageBins = {};

        // Group data by mileage bins
        data.forEach((item) => {
            const mileage = item.mileage;
            const bin = Math.floor(mileage / binSize) * binSize; // Round mileage to bin

            if (!mileageBins[bin]) {
                mileageBins[bin] = [];
            }
            mileageBins[bin].push(item.price);
        });

        let filteredData = [];

        // Iterate over each mileage bin and remove price outliers
        Object.keys(mileageBins).forEach((bin) => {
            let prices = mileageBins[bin];

            // Compute mean and standard deviation of prices
            const mean = prices.reduce((sum, p) => sum + p, 0) / prices.length;
            const stdDev = Math.sqrt(prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / prices.length);

            // Keep data points within 2 standard deviations of the mean
            data.forEach((item) => {
                if (Math.floor(item.mileage / binSize) * binSize === +bin) {
                    if (Math.abs(item.price - mean) <= 2 * stdDev) {
                        filteredData.push(item);
                    }
                }
            });
        });

        return filteredData;
    };

    useEffect(() => {
        const carIdentifier = `${selectedMake}_${selectedModel}`;
        setFullCar(carIdentifier);
        if (carIdentifier !== 'none_none') {
            const fetchJsonData = async () => {
                const jsonData = await getFileFromS3(carIdentifier);
                setServices(jsonData[jsonData.length - 2]);
                setIssues(jsonData[jsonData.length - 1]);
                setCarData(jsonData)
            }

            fetchJsonData();
        }
    }, [selectedModel]);

    useEffect(() => {
        if (carData == null || selectedYear1 === "")
            return;

        const yearLimits = [+selectedYear1, +selectedYear2];
        const yearRange = generateYearRange(yearLimits);
        let filteredData = [];

        for (let i = 0; i < carData.length; i++) {
            for (let j = 0; j < yearRange.length; j++) {
                if (carData[i]["year"] === yearRange[j]) {
                    filteredData.push(...carData[i]["details"]);
                }
            }
        }
        const cleanedData = removeOutliers(filteredData);

        graphHandle(getUniqueEntries(cleanedData,500));
    }, [selectedYear1, selectedYear2]);


    return (
        <div className="graph-container">
            <Graph newCarData={newCarData} usedCarData={usedCarData} bestFitCurve={bestFitCurve} />
            {fullCar === 'none_none' && selectedYear1 === 'none' && (<div className="overlay">Select A Vehicle</div>)}
        </div>
    );
}

export default GraphContainer;
