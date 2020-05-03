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
import HeapIcon from "@material-ui/icons/AccountTreeRounded";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./App.css";

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
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab label="Insertion" icon={<InsertIcon />} {...a11yProps(1)} />
          <Tab label="Bubble" icon={<BubbleIcon />} {...a11yProps(2)} />
          <Tab label="Selection" icon={<SelectIcon />} {...a11yProps(3)} />
          <Tab label="Merge" icon={<MergeIcon />} {...a11yProps(4)} />
          <Tab label="Heap" icon={<HeapIcon />} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel className="tab" value={value} index={0}>
        QuickSort is one of the most efficient sorting algorithms and is based
        on the splitting of an array into smaller ones.
      </TabPanel>
      <TabPanel className="tab" value={value} index={1}>
        This is an in-place comparison-based sorting algorithm. Here, a sub-list
        is maintained which is always sorted.
      </TabPanel>
      <TabPanel className="tab" value={value} index={2}>
        This sorting algorithm involves comparing each pair of adjacent elements
        and swapping them if they are not in order.
      </TabPanel>
      <TabPanel className="tab" value={value} index={3}>
        This sorting algorithm involves dividing the list into two parts: the
        sorted part at the left end and the unsorted part at the right end.
      </TabPanel>
      <TabPanel className="tab" value={value} index={4}>
        Merge sort is a divide-and-conquer algorithm that breaks the list into
        several sub-lists until each sublist consists of a single element and
        merging those sublists in a manner that results into a sorted list.
      </TabPanel>
      <TabPanel className="tab" value={value} index={5}>
        Heapsort is similar to selection sort—we're repeatedly choosing the
        largest item and moving it to the end of our array. The main difference
        is that instead of scanning through the entire array to find the largest
        item, we convert the array into a max heap to speed things up.
      </TabPanel>
    </div>
  );
}
