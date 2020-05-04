import React from "react";
import Selector from "./Selector";
import SortVisualizer from "./SortVisualizer/SortVisualizer";

function App() {
  return (
    <div className="appWrapper">
      <Selector />
      <SortVisualizer></SortVisualizer>
    </div>
  );
}

export default App;
