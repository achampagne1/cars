import React, { useContext } from 'react';
import { Context } from '../../ContextProvider';
import './IssuesTableStyle.css';

const IssuesTable = () => {
    const { issues } = useContext(Context);
    const issueList = Array.isArray(issues?.issues) ? issues.issues : [];

    return (
        <table className="issues-table">
            <thead>
                <tr>
                    <th>Common Issues</th>
                </tr>
            </thead>
            <tbody>
                {issueList.map((issue, index) => (
                    <tr key={index}>
                        <td>{issue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default IssuesTable;

