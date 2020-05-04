import * as SV from "../SortVisualizer/SortVisualizer.js";

export function mergeSort(arr, aux, low, high, visuals) {
  if (low === high) return;
  var mid = Math.floor((low + high) / 2);
  // Alternatively merge the aux and arr arrays.
  mergeSort(aux, arr, low, mid, visuals);
  mergeSort(aux, arr, mid + 1, high, visuals);
  merge(arr, aux, low, mid, high, visuals);
}

function merge(arr, aux, low, mid, high, visuals) {
  var i = low,
    l = low,
    r = mid + 1;
  while (l <= mid && r <= high) {
    // Currently comparing these two indices. Push once to change colours.
    visuals.push([l, r]);
    // Push a second time to revert their colours.
    visuals.push([l, r]);
    if (aux[l] <= aux[r]) {
      // Overwrite value at index i in original array with value of aux[l]
      visuals.push([i, aux[l]]);
      arr[i++] = aux[l++];
    } else {
      visuals.push([i, aux[r]]);
      arr[i++] = aux[r++];
    }
  }
  while (l <= mid) {
    visuals.push([l, l]);
    visuals.push([l, l]);
    visuals.push([i, aux[l]]);
    arr[i++] = aux[l++];
  }
  while (r <= high) {
    visuals.push([r, r]);
    visuals.push([r, r]);
    visuals.push([i, aux[r]]);
    arr[i++] = aux[r++];
  }
}

export function performVisualization(arr) {
  var visuals = [];
  if (arr.length <= 1) return arr;
  var aux = arr.slice();
  mergeSort(arr, aux, 0, arr.length - 1, visuals);
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
      let colour = i % 3 === 0 ? SV.HIGHLIGHT_COLOUR : SV.MAIN_COLOUR;
      setTimeout(() => {
        barOneStyle.backgroundColor = colour;
        barTwoStyle.backgroundColor = colour;
      }, i * SV.ANIMATION_SPEED_MS);
    } else {
      // In the case of a 'c', we want to change the height of the specified bar to be the new value.
      setTimeout(() => {
        var [barOneIndex, newHeight] = visuals[i];
        var barOneStyle = arrayBars[barOneIndex].style;
        barOneStyle.height = `${newHeight / (SV.MAX_ARRAY_VALUE / 100)}%`;
      }, i * SV.ANIMATION_SPEED_MS);
    }
  }
}
