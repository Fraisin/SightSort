import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Autorenew";
import "./SortVisualizer.css";

const maxArrayValue = 500;

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
    this.setState({ array });
  }

  handleChange = (event, newValue) => {
    this.setState({ currArraySize: newValue });
    this.refillArray(newValue);
  };

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
