import './App.css';
import Dropdown from './components/Dropdown';
import Graph from "./components/Graph";



function App() {
    const dataPoints = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 8 },
        { x: 4, y: 16 },
        { x: 5, y: 32 },
    ];

    return (
        <div className="App">
            <h1>Graph Example</h1>
            <Graph dataPoints={dataPoints} />
        </div>
    );
}

export default App;