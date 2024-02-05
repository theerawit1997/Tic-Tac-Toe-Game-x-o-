var size = 3;
var size2 = size * size;

// Displaying the result
console.log("size:", size);
console.log("size2:", size2);

// Initialize an array to store the results
var resultsArray = [];

for (let i = 0; i < size * size; i += size) {
  let row = [];
  for (let j = 0; j < size; j++) {
    row.push(i + j);
  }
  resultsArray.push(row);
}

// Displaying the array
console.log("way to win in horizontal:", resultsArray);
