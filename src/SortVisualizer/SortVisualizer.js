import React from "react";
import "./SortVisualizer.css";

const numOfElements = 100;
const maxArrayValue = 500;

export default class SortVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.refillArray();
  }

  refillArray() {
    const array = [];
    for (let i = 0; i < numOfElements; i++) {
      array.push(getRandomInt(1, maxArrayValue));
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    return (
      <div className="barContainer">
        {array.map((value, index) => (
          <div
            className="arrayBar"
            key={index}
            style={{
              width: `${75 / numOfElements}%`,
              height: `${value / (maxArrayValue / 100)}%`
            }}
          ></div>
        ))}
      </div>
    );
  }
}

//Generates random integer within the interval [min, max].
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
