import * as SV from "../SortVisualizer/SortVisualizer.js";

export function bubbleSort(array, visuals) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      /* Push the two indices that are currently being visited. 
      They are pushed twice - once to highlight them to illustrate 
      that they're being visited and the second to revert their colours. */
      visuals.push([j, j + 1, "v"]);
      visuals.push([j, j + 1, "r"]);
      if (array[j] > array[j + 1]) {
        // Push the index that needs to be changed as well as its new value.
        visuals.push([j, array[j + 1], "s"]);
        visuals.push([j + 1, array[j], "s"]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}

export function performVisualization(array) {
  const promises = []; //array of promises used to determine when visualization is complete
  var visuals = [];
  bubbleSort(array, visuals);
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
