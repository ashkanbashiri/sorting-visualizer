import React from 'react';
import {
  getMergeSortAnimations,
  getquickSortAnimations,
  getBubbleSortAnimations,
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.

// Change this value for the number of bars (value) in the array.

// This is the main color of the array bars.
const PRIMARY_COLOR = 'PALETURQUOISE';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'orangered';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      showmsg: false,
      arr_size: 50,
      animation_speed: 1,
      quickSortDisabled: false,
      heapSortDisabled: false,
      mergeSortDisabled: false,
      bubbleSortDisabled: false,
      sliderDisabled: false,
      resetArrayDisabled: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.arr_size; i++) {
      array.push(randomIntFromInterval(1, 400));
    }
    this.setState({ array: array });
  }

  disableAll() {
    this.setState({
      quickSortDisabled: true,
      heapSortDisabled: true,
      mergeSortDisabled: true,
      bubbleSortDisabled: true,
      sliderDisabled: true,
      resetArrayDisabled: true
    });
  }
  enableAll() {
    this.setState({
      quickSortDisabled: false,
      heapSortDisabled: false,
      mergeSortDisabled: false,
      bubbleSortDisabled: false,
      sliderDisabled: false,
      resetArrayDisabled: false
    });
  }
  mergeSort() {
    this.disableAll();
    const [animations, temp] = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const tooltips = document.getElementsByClassName('tooltiptext');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animation_speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const tooltip = tooltips[barOneIdx];
          barOneStyle.height = `${newHeight}px`;
          tooltip.innerHTML = newHeight;
          if (i == animations.length - 1)
            this.enableAll();
        }, i * this.state.animation_speed);
      }
    }
    //this.enableAll();
  }

  quickSort() {
    this.disableAll();
    const [animations, temp] = getquickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const tooltips = document.getElementsByClassName('tooltiptext');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animation_speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const tooltip = tooltips[barOneIdx];
          barOneStyle.height = `${newHeight}px`;
          tooltip.innerHTML = newHeight;
          if (i == animations.length - 1)
            this.enableAll();
        }, i * this.state.animation_speed);
      }
    }
    /* document.getElementById("slider").disabled = false;
     document.getElementById("resetArray").disabled = false;
     document.getElementById("quickSort").disabled = false;
     document.getElementById("bubbleSort").disabled = false;
     document.getElementById("mergeSort").disabled = false;
     document.getElementById("heapSort").disabled = false;*/

  }

  afterSort() {

  }

  heapSort() { }

  bubbleSort() {
    this.disableAll();
    this.setState({ showmsg: true });
    setTimeout(() => { this.setState({ showmsg: false }); }, 3000);
    const [animations, temp] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const tooltips = document.getElementsByClassName('tooltiptext');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animation_speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const tooltip = tooltips[barOneIdx];
          barOneStyle.height = `${newHeight}px`;
          tooltip.innerHTML = newHeight;
          if (i == animations.length - 1)
            this.enableAll();
        }, i * this.state.animation_speed);
      }
    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = 100;
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const [tempArray, sortedArray] = getMergeSortAnimations(array);
      const [tempArray2, sortedArray2] = getquickSortAnimations(array);

      console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, sortedArray2));
    }
  }

  handleSizeChange(e) {
    let obj = {};
    this.setState({ arr_size: e.target.value });
    //this.setState(obj);
    this.resetArray();
    console.log(this.state.arr_size);
  }
  //<div className="tooltiptext">{this.state.arr_size}</div>

  render() {
    const { array } = this.state;

    return (
      <div className="grid-container">
        <div className="header">
          <div>
            <div className="input-range">
              <p><b>Array Size: </b></p>
              <input
                type="range"
                min="5"
                max="200" data-toggle="tooltip" data-placement="left" title={this.state.arr_size}
                className="input-range"
                disabled={this.state.sliderDisabled}
                value={this.state.arr_size}
                onChange={e => {
                  this.handleSizeChange(e);
                }}
                id="slider" />
            </div>
            <button
              id="resetArray"
              className="btn btn-dark"
              disabled={this.state.resetArrayDisabled}
              type="button"
              onClick={() => this.resetArray()}>
              New Random List
            </button>
          </div>
          <div>
            <button id="mergeSort" disabled={this.state.mergeSortDisabled}
              className="btn btn-info" onClick={() => this.mergeSort()}>
              Merge Sort
        </button>
          </div>
          <div>
            <button id="quickSort" disabled={this.state.quickSortDisabled}
              className="btn btn-info" onClick={() => this.quickSort()}>
              Quick Sort
        </button>
          </div>
          <div>
            <button id="heapSort" disabled={this.state.heapSortDisabled}
              className="btn btn-info" onClick={() => this.heapSort()}>
              Heap Sort
        </button>
          </div>
          <div>
            <button id="bubbleSort" disabled={this.state.bubbleSortDisabled}
              className="btn btn-info" onClick={() => this.bubbleSort()}>
              Bubble Sort
        </button></div>
          <button
            className="btn btn-warning"
            style={{ display: 'none' }}
            onClick={() => this.testSortingAlgorithms()}>
            Test
        </button>
        </div>
        <div className="middle">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}>
              <div className="tooltiptext">{value}</div>
            </div>
          ))}
          <br />

          <div
            id="msg"
            style={{
              display: this.state.showmsg ? 'block' : 'None',
              position: `fixed`,
              width: `500px`,
              height: `100px`,
              top: `50%`,
              left: `50%`,
              color: `gray`,
              fontWeight: 'bold',
              backgroundColor: 'cyan',
              textAlign: 'center',
              marginTop: `-100px`,
              marginLeft: `-250px`,
            }}>
            SPOILERS! BubbleSort is a bit slow --> O(N^2)
        </div>
        </div>

      </div>

    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
