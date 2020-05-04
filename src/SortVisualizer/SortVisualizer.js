import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Autorenew";
import * as Merge from "../SortingAlgorithms/mergeSort.js";
import "./SortVisualizer.css";

const maxArrayValue = 500;
const UNVISITED_COLOUR = "#fad169";
const VISITED_COLOUR = "#4eccbf";
const ANIMATION_SPEED_MS = 5;

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export default class SortVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currArraySize: 100,
      array: []
    };
  }

  componentDidMount() {
    this.refillArray(this.state.currArraySize);
  }

  refillArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(getRandomInt(1, maxArrayValue));
    }
    //Ensure that colours of the bars are back to normal.
    var arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = UNVISITED_COLOUR;
    }
    this.setState({ array });
  }

  handleChange = (event, newValue) => {
    this.setState({ currArraySize: newValue });
    this.refillArray(newValue);
  };

  //Sorting algorithms that call helper methods.
  quickSort() {}
  insertionSort() {}
  bubbleSort() {}
  selectionSort() {}
  mergeSort() {
    var visuals = Merge.getVisuals(this.state.array);
    var arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < visuals.length; i++) {
      /* Our visual array will look something like the following: [v, v, c, v, v, c, v, v, c ...]
        where 'v' represents the 2 indices of the array that are currently being visited and 'c' 
        represents that a bar's height has actually changed. */
      var changeColour = i % 3 !== 2; //Therefore, we only want to change colours on the 'v's.
      if (changeColour) {
        var [barOneIndex, barTwoIndex] = visuals[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = VISITED_COLOUR;
          barTwoStyle.backgroundColor = VISITED_COLOUR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // In the case of a 'c', we want to change the height of the specified bar to be the new value.
        setTimeout(() => {
          var [barOneIndex, newHeight] = visuals[i];
          var barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight / (maxArrayValue / 100)}%`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  heapSort() {}

  //Tests every implemented sorting algorithm.
  testSortingAlgorithms() {
    this.test(Merge.mergeSort);
  }

  //Test for a single sorting algorithm that takes the sorting method as a parameter.
  test(func) {
    var numOfTestIterations = 100;
    var arrayLength = 500;
    var visuals = [];
    for (let i = 0; i < numOfTestIterations; i++) {
      var testArray = [];
      for (let j = 0; j < arrayLength; j++) {
        testArray.push(getRandomInt(-5000, 5000));
      }
      var arrayCopy = testArray.slice().sort(function(a, b) {
        return a - b;
      });
      func(testArray, testArray.slice(), 0, testArray.length - 1, visuals);
      console.log(arraysEqual(arrayCopy, testArray));
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div>
        <div className="slider">
          <h3>Control Array Size</h3>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="Array Size"
            defaultValue={100}
            max={500}
            min={5}
            onChange={this.handleChange}
          />
        </div>
        <div className="btnsWrapper">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<RefreshIcon />}
            className="mainBtn"
            onClick={() => {
              this.refillArray(this.state.currArraySize);
            }}
          >
            Generate New Array
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<RefreshIcon />}
            className="mainBtn"
            onClick={() => {
              this.mergeSort();
            }}
          >
            Sort
          </Button>
        </div>
        <div className="barContainer">
          {array.map((value, index) => (
            <div
              className="arrayBar"
              key={index}
              style={{
                width: `${75 / array.length}%`,
                height: `${value / (maxArrayValue / 100)}%`
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

//Generates random integer within the interval [min, max].
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Determines if two arrays are equal for testing purposes.
function arraysEqual(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
