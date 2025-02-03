import React from 'react';
import './ServiceTableStyle.css';

const ServiceTable = () => {
    const serviceIntervals = [
        { mileage: "5,000 miles", service: "Oil & filter change, Tire rotation, Brake inspection, Fluid level check" },
        { mileage: "10,000 miles", service: "Synthetic oil & filter change, Inspect wiper blades, Top off all fluids" },
        { mileage: "15,000 miles", service: "Inspect cabin air filter, Engine air filter, Brake system, Suspension" },
        { mileage: "30,000 miles", service: "Replace engine & cabin air filter, Inspect fuel system & connections" },
        { mileage: "60,000 miles", service: "Inspect/replace spark plugs, Inspect drive belts" },
        { mileage: "100,000 miles", service: "Inspect coolant system, Replace transmission fluid if required" }
    ];

    return (
        <table className="service-table">
            <thead>
                <tr>
                    <th>Mileage</th>
                    <th>Recommended Service</th>
                </tr>
            </thead>
            <tbody>
                {serviceIntervals.map((interval, index) => (
                    <tr key={index}>
                        <td>{interval.mileage}</td>
                        <td>{interval.service}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ServiceTable;
