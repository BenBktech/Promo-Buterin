import { EthProvider } from "./contexts/EthContext";
import Web3stuff from "./components/Web3stuff/";


function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Web3stuff />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
