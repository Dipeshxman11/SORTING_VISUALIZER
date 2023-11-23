
let randomize_array = document.getElementById("randomize_array_btn");
let bars_container = document.getElementById("bars_container");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});


function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        await swap(array, j, j + 1, bars);
      }
    }
  }
  return array;
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "lightgreen";
  bars[j].style.backgroundColor = "lightgreen";
  await sleep(speedFactor);
  bars[i].style.backgroundColor = "aqua";
  bars[j].style.backgroundColor = "aqua";
}

async function selectionSort(array) {
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "red";

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          bars[minIndex].style.backgroundColor = "aqua";
        }
        minIndex = j;
        bars[minIndex].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "aqua";
      }

      await sleep(speedFactor);
    }

    await swap(array, i, minIndex, bars);

    bars[i].style.backgroundColor = "green";
    bars[minIndex].style.backgroundColor = "green";
    await sleep(speedFactor);
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = "green";
    await sleep(speedFactor);
  }

  return array;
}

async function shellSort(array) {
  let bars = document.getElementsByClassName("bar");

  for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        bars[j].style.backgroundColor = "red";
        bars[j - gap].style.backgroundColor = "red";

        array[j] = array[j - gap];
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j - gap].style.height = array[j - gap] * heightFactor + "px";

        await sleep(speedFactor);

        bars[j].style.backgroundColor = "aqua";
        bars[j - gap].style.backgroundColor = "aqua";

        j -= gap;
      }

      array[j] = temp;
      bars[j].style.height = array[j] * heightFactor + "px";
      await sleep(speedFactor);
    }
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = "green";
    await sleep(speedFactor);
  }

  return array;
}

async function mergeSort(array) {
  let bars = document.getElementsByClassName("bar");
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(await mergeSort(left), await mergeSort(right));

  async function merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft]);
        bars[indexLeft + indexRight].style.height = left[indexLeft] * heightFactor + "px";
        indexLeft++;
      } else {
        result.push(right[indexRight]);
        bars[indexLeft + indexRight].style.height = right[indexRight] * heightFactor + "px";
        indexRight++;
      }
      await sleep(speedFactor);
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  }
}

async function insertionSort(array) {
  let bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      await sleep(speedFactor);
      j--;
    }

    array[j + 1] = current;
    bars[j + 1].style.height = current * heightFactor + "px";
    await sleep(speedFactor);
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = "green";
    await sleep(speedFactor);
  }

  return array;
}

async function quickSort(array, left, right) {
  let bars = document.getElementsByClassName("bar");
  let index;

  if (array.length > 1) {
    index = partition(array, left, right);

    if (left < index - 1) {
      await quickSort(array, left, index - 1);
    }

    if (index < right) {
      await quickSort(array, index, right);
    }
  }

  return array;

  async function partition(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }

      while (array[j] > pivot) {
        j--;
      }

      if (i <= j) {
        await swap(array, i, j, bars);
        i++;
        j--;
      }
    }

    return i;
  }
}

document.getElementById("bubble_sort_btn").addEventListener("click", function () {
  bubbleSort(unsorted_array);
});

document.getElementById("selection_sort_btn").addEventListener("click", function () {
  selectionSort(unsorted_array);
});

document.getElementById("shell_sort_btn").addEventListener("click", function () {
  shellSort(unsorted_array);
});

document.getElementById("merge_sort_btn").addEventListener("click", async function () {
  await mergeSort(unsorted_array);
});

document.getElementById("insertion_sort_btn").addEventListener("click", async function () {
  await insertionSort(unsorted_array);
});

document.getElementById("quick_sort_btn").addEventListener("click", async function () {
  await quickSort(unsorted_array, 0, unsorted_array.length - 1);
});
