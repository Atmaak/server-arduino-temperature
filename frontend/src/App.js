import Humidity from "./Humidity";
import Temperature from "./Temperature";

function App() {
  return (
    <div className="App">
      <div className="circleHome">
        <Temperature />
        <Humidity />
      </div>
    </div>
  );
}

export default App;
