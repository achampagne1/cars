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
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Miles',
                },
                ticks: {
                    callback: function (value) {
                        return value >= 1000 ? `${value / 1000}k` : value;
                    },
                    autoSkip: true,
                    maxRotation: 0, 
                    minRotation: 0
                },
                grid: {
                    drawBorder: false,
                    drawTicks: false, 
                    lineWidth: 0 // Make grid lines thinner
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Dollars',
                },
                ticks: {
                    callback: function (value) {
                        return value >= 1000 ? `${value / 1000}k` : value;
                    },
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0
                },
                grid: {
                    drawBorder: false,
                    drawTicks: false,
                    lineWidth: 0.3
                }
            }
        },
        plugins: {
            legend: {
                display: true, // Set to false if you want more space for the chart
                position: 'top', // Adjust legend position
                labels: {
                    boxWidth: 10 // Make legend icons smaller
                }
            }
        }
    };

    return <Scatter data={chartData} options={options} />;
};

export default Graph;
