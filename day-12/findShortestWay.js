function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function findALetter(letter, array) {
  const letterRow = array.findIndex((row) => row.includes(letter));
  const letterColumn = array[letterRow].indexOf(letter);
  return [letterRow, letterColumn];
}

function findShortestWay() {
  const data = readData();
  const routeArray = data.map((route) => route.split(''));
  console.dir(routeArray, { depth: null });
  // find the starting point 'S'
  //find the end point 'E'
  // find the shortest way to the end point from the starting point
  // only move in the four cardinal directions
  // only move at most one letter later in the alphabet
  // (e.g. from 'a' to 'b', but not from 'a' to 'c')

  const startPoint = findALetter('S', routeArray);
  const endPoint = findALetter('E', routeArray);

  console.log(startPoint, endPoint);
}
findShortestWay();
