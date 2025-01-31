import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DropdownContainer from './components/DropdownContainer'
import { ContextProvider } from './ContextProvider';
import GraphContainer from "./components/GraphContainer";
import PopupContainer from "./components/PopupContainer";
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {
    const serviceIntervals = [
        { mileage: "5,000 miles", service: "Oil & filter change, Tire rotation, Brake inspection, Fluid level check" },
        { mileage: "10,000 miles", service: "Synthetic oil & filter change, Inspect wiper blades, Top off all fluids" },
        { mileage: "15,000 miles", service: "Inspect cabin air filter, Engine air filter, Brake system, Suspension" },
        { mileage: "30,000 miles", service: "Replace engine & cabin air filter, Inspect fuel system & connections" },
        { mileage: "60,000 miles", service: "Inspect/replace spark plugs, Inspect drive belts" },
        { mileage: "100,000 miles", service: "Inspect coolant system, Replace transmission fluid if required" }
    ];

    return (
        <ContextProvider>
            <div className="App">
                <div className="body">
                    <h1>Take the hassle out of buying a car</h1>
                    <div className="dropdown-container">
                        <DropdownContainer />
                    </div>
                    <div className="graph-section">
                        <p className="pricing-trends">Pricing Trends</p>
                        <GraphContainer />
                    </div>
                    <div className="recommended-service">
                        <h2>Recommended Service Intervals</h2>
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
                    </div>
                </div>
                <div className="footer">
                    <PopupContainer/>
                    <p>&copy; 2025 Auto Hassle. All rights reserved.</p>
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
