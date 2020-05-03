import React from "react";
import Selector from "./Selector";
import SortVisualizer from "./SortVisualizer/SortVisualizer";

function App() {
  return (
    <div>
      <div className="selector">
        <Selector />
      </div>
      <SortVisualizer></SortVisualizer>
    </div>
  );
}

export default App;
