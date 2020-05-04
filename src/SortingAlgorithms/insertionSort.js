import * as SV from "../SortVisualizer/SortVisualizer.js";

export function insertionSort(array, visuals) {
  for (let step = 1; step < array.length; step++) {
    var key = array[step];
    //Highlight and unhighlight the current key.
    visuals.push([step, step, "k"]);
    visuals.push([step, step, "r"]);
    var j = step - 1;
    while (j >= 0 && key < array[j]) {
      //Highlight and unhighlight the two indices currently being compared.
      visuals.push([j, j + 1, "v"]);
      visuals.push([j, j + 1, "r"]);
      //Change index j + 1 to be the value of its previous index.
      visuals.push([j + 1, array[j], "s"]);
      //Change the previous index to be the height of the key to simulate
      //the key 'traversing' until it finds the right location.
      visuals.push([j, key, "s"]);
      array[j + 1] = array[j];
      j--;
    }
    visuals.push([j + 1, key, "s"]);
    array[j + 1] = key;
  }
}

export function performVisualization(array) {
  var visuals = [];
  insertionSort(array, visuals);
  var arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < visuals.length; i++) {
    /* The third element of each visual represents what kind of action to take.
      - 'v' means we are currently visiting these two indices.
      - 'r' means we are finished visiting and should revert back.
      - 'k' means we should highlight our current 'key', or element for insertion.
      - 's' means we should swap these two indices in the array. */
    var key = visuals[i][2];
    var changeColour = key === "v" || key === "r" || key === "k";
    if (changeColour) {
      var barOneIndex = visuals[i][0];
      var barTwoIndex = visuals[i][1];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      let colour;
      if (key === "v") colour = SV.HIGHLIGHT_COLOUR;
      if (key === "r") colour = SV.MAIN_COLOUR;
      if (key === "k") colour = SV.SPECIAL_HIGHLIGHT;
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
