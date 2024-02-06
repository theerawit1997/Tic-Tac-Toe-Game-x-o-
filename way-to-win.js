var size = 4;
console.log("size:", size);

var resultsWin = [];

// horizontal
var horizontal = [];
for (let i = 0; i < size * size; i += size) {
  let row1 = [];
  for (let j = 0; j < size; j++) {
    row1.push(i + j);
  }
  horizontal.push(row1);
  resultsWin.push(row1);
}
console.log("way to win in horizontal:", horizontal);

// vertical
var vertical = [];
for (let j = 0; j < size; j++) {
  let row2 = [];
  for (let i = 0; i < size * size; i += size) {
    row2.push(i + j);
  }
  vertical.push(row2);
  resultsWin.push(row2);
}
console.log("way to win in vertical:", vertical);

//diagonally-down
var diagonallyDown = [];
var row3 = [];
for (let i = 0; i < size; i++) {
  let tmp = (size + 1) * i;
  row3.push(tmp);
}
diagonallyDown.push(row3);
resultsWin.push(row3);
console.log("way to win in diagonally-down:", diagonallyDown);

//diagonally-up
var diagonallyUp = [];
var row4 = [];
for (let i = 0; i < size; i++) {
  let tmp = (size - 1) * i + (size - 1);
  row4.push(tmp);
}
diagonallyUp.push(row4);
resultsWin.push(row4);
console.log("way to win in diagonally-up:", diagonallyUp);

console.log("...");
console.log("All way to win :", resultsWin);
