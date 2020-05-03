export function getVisuals(arr) {
  var visuals = [];
  if (arr.length <= 1) return arr;
  var aux = arr.slice();
  mergeSort(arr, aux, 0, arr.length - 1, visuals);
  return visuals;
}

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
