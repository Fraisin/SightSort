import * as SV from "../SortVisualizer/SortVisualizer.js";

export function selectionSort(array, visuals) {
  for (let left = 0; left < array.length; left++) {
    var minIndex = left;
    for (let i = left + 1; i < array.length; i++) {
      /* Push the two indices that are currently being visited. 
      They are pushed twice - once to highlight them to illustrate 
      that they're being visited and the second to revert their colours. */
      visuals.push([i, minIndex, "v"]);
      visuals.push([i, minIndex, "r"]);
      if (array[i] < array[minIndex]) {
        minIndex = i;
      }
    }
    // Push the index that needs to be changed as well as its new value.
    visuals.push([minIndex, array[left], "s"]);
    visuals.push([left, array[minIndex], "s"]);
    var temp = array[minIndex];
    array[minIndex] = array[left];
    array[left] = temp;
  }
}

export function performVisualization(array) {
  var visuals = [];
  selectionSort(array, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    /* The third element of each visual represents what kind of action to take.
      - 'v' means we are currently visiting these two indices.
      - 'r' means we are finished visiting and should revert back.
      - 's' means we should swap these two indices in the array. */
    var changeColour = visuals[i][2] === "v" || visuals[i][2] === "r";
    if (changeColour) {
      var [barOneIndex, barTwoIndex, key] = visuals[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour = key === "v" ? SV.HIGHLIGHT_COLOUR : SV.MAIN_COLOUR;
      setTimeout(() => {
        barOneStyle.backgroundColor = colour;
        barTwoStyle.backgroundColor = colour;
      }, i * SV.ANIMATION_SPEED_MS);
    } else {
      // In the case of an 's', we want to change the height of the specified bar to be the new value.
      setTimeout(() => {
        var barOneIndex = visuals[i][0];
        var newHeight = visuals[i][1];
        var barOneStyle = arrayBars[barOneIndex].style;
        barOneStyle.height = `${newHeight / (SV.MAX_ARRAY_VALUE / 100)}%`;
      }, i * SV.ANIMATION_SPEED_MS);
    }
  }
}
