import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DropdownContainer from './components/DropdownContainer'
import { ContextProvider } from './ContextProvider';
import GraphContainer from "./components/GraphContainer";
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {

    return (
        <ContextProvider>
            <div className="App">
                <h1>Used Car Depreciation Grapher</h1>
                <DropdownContainer />
                <div className="graph-container">
                    <GraphContainer dataPoints />
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
