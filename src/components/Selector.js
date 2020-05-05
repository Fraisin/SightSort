import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import QuickIcon from "@material-ui/icons/FastForwardRounded";
import InsertIcon from "@material-ui/icons/MenuOpenRounded";
import BubbleIcon from "@material-ui/icons/BubbleChartRounded";
import SelectIcon from "@material-ui/icons/ColorizeRounded";
import MergeIcon from "@material-ui/icons/MergeTypeRounded";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { setCurrTab } from "../SortVisualizer/SortVisualizer.js";
import "../App.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Selector() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className="tabsContainer" position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Quick" icon={<QuickIcon />} {...a11yProps(0)} />
          <Tab label="Merge" icon={<MergeIcon />} {...a11yProps(2)} />
          <Tab label="Insertion" icon={<InsertIcon />} {...a11yProps(2)} />
          <Tab label="Bubble" icon={<BubbleIcon />} {...a11yProps(3)} />
          <Tab label="Selection" icon={<SelectIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel className="tab" value={value} index={0}>
        QuickSort is one of the most efficient sorting algorithms and is based
        on the splitting of an array into smaller ones.
      </TabPanel>
      <TabPanel className="tab" value={value} index={1}>
        Merge sort is a divide-and-conquer algorithm that breaks the list into
        several sub-lists and merges those sublists to form a sorted list.
      </TabPanel>
      <TabPanel className="tab" value={value} index={2}>
        This is an in-place comparison-based sorting algorithm. Here, a sub-list
        is maintained which is always sorted.
      </TabPanel>
      <TabPanel className="tab" value={value} index={3}>
        This sorting algorithm involves comparing each pair of adjacent elements
        and swapping them if they are not in order.
      </TabPanel>
      <TabPanel className="tab" value={value} index={4}>
        This sorting algorithm involves dividing the list into two parts: the
        sorted part at the left end and the unsorted part at the right end.
      </TabPanel>
    </div>
  );
}
