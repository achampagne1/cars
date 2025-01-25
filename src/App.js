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

    return (
        <ContextProvider>
            <div className="App">
                <div className="body">
                    <h1>Take the hassle out of buying a car</h1>
                    <div className="dropdown-container">
                        <DropdownContainer />
                    </div>
                    <GraphContainer dataPoints />
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
