export function mergeSort(array) {
  if (array.length === 1) return;
  var middle = Math.floor(array.length / 2);
  var leftHalf = array.slice(0, middle);
  var rightHalf = array.slice(middle);
  mergeSort(leftHalf);
  mergeSort(rightHalf);
  var l = 0,
    r = 0,
    i = 0;
  while (l < leftHalf.length && r < rightHalf.length) {
    if (leftHalf[l] < rightHalf[r]) {
      array[i++] = leftHalf[l++];
    } else {
      array[i++] = rightHalf[r++];
    }
  }
  while (l < leftHalf.length) array[i++] = leftHalf[l++];
  while (r < rightHalf.length) array[i++] = rightHalf[r++];
}
