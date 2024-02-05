var size = 3;
var size2 = size * size;

// Displaying the result
console.log("size:", size);
console.log("size2:", size2);

for (let i = 0; i < size * size; i += size) {
  let resultString = "";
  for (let j = 0; j < size; j++) {
    resultString += i + j + " ";
  }
  console.log(resultString.trim());
}
