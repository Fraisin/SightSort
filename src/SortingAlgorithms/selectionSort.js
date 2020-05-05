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
        //Highlight the minimum index a different colour once changed.
        visuals.push([minIndex, minIndex, "m"]);
      }
    }
    //Push the index that needs to be changed as well as its new value.
    visuals.push([minIndex, minIndex, "r"]);
    visuals.push([minIndex, array[left], "s"]);
    visuals.push([left, array[minIndex], "s"]);
    var temp = array[minIndex];
    array[minIndex] = array[left];
    array[left] = temp;
  }
}

export function performVisualization(array) {
  const promises = []; //array of promises used to determine when visualization is complete
  var visuals = [];
  selectionSort(array, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    /* The third element of each visual represents what kind of action to take.
      - 'v' means we are currently visiting these two indices.
      - 'r' means we are finished visiting and should revert back.
      - 'm' means we should highlight the minimum element found during traversal.
      - 's' means we should swap these two indices in the array. */
    var key = visuals[i][2];
    var changeColour = key === "v" || key === "r" || key === "m";
    if (changeColour) {
      var barOneIndex = visuals[i][0];
      var barTwoIndex = visuals[i][1];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour;
      if (key === "v") colour = SV.HIGHLIGHT_COLOUR;
      if (key === "r") colour = SV.MAIN_COLOUR;
      if (key === "m") colour = SV.SPECIAL_HIGHLIGHT;
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
