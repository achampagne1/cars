import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Graph = ({newCarData, usedCarData, bestFitCurve }) => {
    const chartData = {
        datasets: [
            {
                label: 'Average Price',
                data: bestFitCurve,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                showLine: true,
                pointRadius: 0,
            },
            {
                label: 'Used Car Listings',
                data: usedCarData,
                backgroundColor: 'rgba(0, 174, 239, 1)',
                pointRadius: 5,
            },
            {
                label: 'New Car Listings',
                data: newCarData,
                backgroundColor: 'rgba(245, 0, 55, 1)',
                pointRadius: 5,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Miles', // Customize the x-axis label text
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Dollars', // Customize the y-axis label text
                },
            },
        },
    };

    return <Scatter data={chartData} options={options} />;
};

export default Graph;
