import React from "react";
import Selector from "./Selector";
import Slider from "./Slider";
import SortVisualizer from "./SortVisualizer/SortVisualizer";

function App() {
  return (
    <div>
      <Selector />
      <Slider />
      <SortVisualizer></SortVisualizer>
    </div>
  );
}

export default App;
