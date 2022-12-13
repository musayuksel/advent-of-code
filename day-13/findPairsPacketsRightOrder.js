function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n\n');
}

function findPairsPacketsRightOrder() {
  const data = readData();
  console.log({ data });
}
findPairsPacketsRightOrder();
