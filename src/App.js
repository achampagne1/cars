import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DropdownContainer from './components/DropdownContainer'
import { ContextProvider } from './ContextProvider';
import GraphContainer from "./components/GraphContainer";
import PopupContainer from "./components/PopupContainer";
import IssuesTable from "./components/IssuesTable";
import ServiceTable from "./components/ServiceTable";
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {
    return (
        <ContextProvider>
            <div className="App">
                <div className="header">
                    <img src="/logo192.png" alt="Logo" className="logo" />
                    <h1>Auto Hassle</h1>
                </div>

                <div className="body">
                    <div className="graph-section">
                        <DropdownContainer />
                        <GraphContainer />
                    </div>
                    <div className="table-section">
                        <ServiceTable />
                        <IssuesTable />
                    </div>
                </div>
                <div className="footer">
                    <PopupContainer />
                    <p>&copy; 2025 Auto Hassle. All rights reserved.</p>
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
