import * as SV from "../SortVisualizer/SortVisualizer.js";

export function quickSort(array, start, end, visuals) {
  if (start >= end) return;
  var pIndex = partition(array, start, end, visuals);
  quickSort(array, start, pIndex - 1, visuals);
  quickSort(array, pIndex + 1, end, visuals);
}

function partition(array, start, end, visuals) {
  var pivot = array[end];
  var pIndex = start;
  //Push the end of the pivot to highlight it. Push a second time to undo highlight.
  visuals.push([end, end, "p"]);
  visuals.push([end, end, "r"]);
  for (let i = start; i < end; i++) {
    //Push the two elements we are currently comparing for highlighting.
    visuals.push([i, pIndex, "v"]);
    visuals.push([i, pIndex, "r"]);
    if (array[i] < pivot) {
      //Push the indices that need to be changed as well as their new values.
      visuals.push([i, array[pIndex], "s"]);
      visuals.push([pIndex, array[i], "s"]);
      let temp = array[i];
      array[i] = array[pIndex];
      array[pIndex] = temp;
      pIndex++;
    }
  }
  // Swap the pivot and the element at the pivot index.
  visuals.push([pIndex, end, "v"]);
  visuals.push([pIndex, end, "r"]);
  visuals.push([pIndex, array[end], "s"]);
  visuals.push([end, array[pIndex], "s"]);
  var temp = array[pIndex];
  array[pIndex] = array[end];
  array[end] = temp;
  return pIndex;
}

export function performVisualization(array) {
  const promises = []; //array of promises used to determine when visualization is complete
  var visuals = [];
  quickSort(array, 0, array.length - 1, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    /* The third element of each visual represents what kind of action to take.
    - 'v' means we are currently visiting these two indices.
    - 'r' means we are finished visiting and should revert back.
    - 'p' means we should highlight the current pivot point of the array.
    - 's' means we should swap these two indices in the array. */
    var key = visuals[i][2];
    var changeColour = key === "v" || key === "r" || key === "p";
    if (changeColour) {
      var barOneIndex = visuals[i][0];
      var barTwoIndex = visuals[i][1];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour;
      if (key === "v") colour = SV.HIGHLIGHT_COLOUR;
      if (key === "r") colour = SV.MAIN_COLOUR;
      if (key === "p") colour = SV.SPECIAL_HIGHLIGHT;
      promises.push(
        new Promise(resolve => {
          setTimeout(() => {
            barOneStyle.backgroundColor = colour;
            barTwoStyle.backgroundColor = colour;
            resolve();
          }, i * SV.ANIMATION_SPEED_MS);
        })
      );
    } else {
      // In the case of an 's', we want to change the height of the specified bar to be the new value.
      promises.push(
        new Promise(resolve => {
          setTimeout(() => {
            var barOneIndex = visuals[i][0];
            var newHeight = visuals[i][1];
            var barOneStyle = arrayBars[barOneIndex].style;
            barOneStyle.height = `${newHeight / (SV.MAX_ARRAY_VALUE / 100)}%`;
            resolve();
          }, i * SV.ANIMATION_SPEED_MS);
        })
      );
    }
  }
  return Promise.all(promises);
}
