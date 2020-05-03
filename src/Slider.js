import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: 600 + theme.spacing(3) * 2,
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

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

export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Control Array Size</h3>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="Array Size"
        defaultValue={100}
        max="500"
      />
    </div>
  );
}
