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
}
findShortestWay();
