export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return [animations, array];
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getquickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return [animations, array];
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low - 1; // index of smaller element
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    animations.push([j, high]);
    animations.push([j, high]);
    if (arr[j] < pivot) {
      i++;
      // swap arr[i] and arr[j]
      animations.push([i, arr[j]]);
      animations.push([j, arr[i]]);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    } else {
      animations.push([i + 1, arr[i]]);
      animations.push([j, arr[j]]);
    }
  }

  // swap arr[i+1] and arr[high] (or pivot)
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);
  animations.push([i + 1, arr[high]]);
  animations.push([high, arr[i + 1]]);
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

/* The main function that implements QuickSort() 
      arr[] --> Array to be sorted, 
      low  --> Starting index, 
      high  --> Ending index */
function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    /* pi is partitioning index, arr[pi] is  
              now at right place */
    let pi = partition(arr, low, high, animations);

    // Recursively sort elements before
    // partition and after partition
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        // swap arr[j+1] and arr[i]
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        animations.push([j, array[j]]);
        animations.push([j + 1, array[j + 1]]);
      }
    }
  }
  return [animations, array];
}
