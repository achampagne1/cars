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
                <h1>Take the hassle out of buying a car</h1>
                <div className="dropdown-container">
                    <DropdownContainer />
                </div>
                <div className="graph-container">
                    <GraphContainer dataPoints />
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
