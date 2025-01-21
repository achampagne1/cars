import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                <h1>Graph Example</h1>
                <DropdownContainer/>
                <GraphContainer dataPoints />
            </div>
        </ContextProvider>
    );
}

export default App;