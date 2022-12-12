function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
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

  const startingPointRow = routeArray.findIndex((row) => row.includes('S'));
  const startingPointColumn = routeArray[startingPointRow].indexOf('S');

  const endPointRow = routeArray.findIndex((row) => row.includes('E'));
  const endPointColumn = routeArray[endPointRow].indexOf('E');

  console.log(
    startingPointRow,
    startingPointColumn,
    endPointRow,
    endPointColumn
  );
}
findShortestWay();
