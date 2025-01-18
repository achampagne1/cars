import './GraphStyle.css';
import React from "react";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ dataPoints }) => {
    const scatterData = dataPoints.map((point) => ({ x: point.x, y: point.y }));

    const data = {
        datasets: [
            {
                label: "Scatter Data Points",
                data: scatterData,
                backgroundColor: "rgba(75, 192, 192, 0.8)", // Marker color
                pointRadius: 5, // Marker size
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "X-Axis Label",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Y-Axis Label",
                },
            },
        },
    };

    return <Scatter data={data} options={options} />;
};

export default Graph;
