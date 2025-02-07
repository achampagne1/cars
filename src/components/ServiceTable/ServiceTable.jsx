import React, { useContext } from 'react';
import { Context } from '../../ContextProvider';
import './ServiceTableStyle.css';

const ServiceTable = () => {
    const { services } = useContext(Context);
    const serviceList = services?.services ?? [];

    return (
        <table className="service-table">
            <thead>
                <tr>
                    <th>Mileage</th>
                    <th>Recommended Service</th>
                </tr>
            </thead>
            <tbody>
                {serviceList.map((serviceList, index) => (
                    <tr key={index}>
                        <td>{serviceList.mileage.toLocaleString()} miles</td>
                        <td>{serviceList.service}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ServiceTable;
