export function getVisuals(array) {
  var visuals = [];
  bubbleSort(array, visuals);
  return visuals;
}

export function bubbleSort(array, visuals) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      visuals.push([j, j + 1, "v"]);
      visuals.push([j, j + 1, "r"]);
      if (array[j] > array[j + 1]) {
        visuals.push([j, array[j + 1], "s"]);
        visuals.push([j + 1, array[j], "s"]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}
