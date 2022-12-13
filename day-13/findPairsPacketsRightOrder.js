function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n\n');
}

function findPairsArrays(data) {
  return data.map((item) => {
    const [left, right] = item.split('\n');
    return [eval(left), eval(right)];
  });
}

function findPairsPacketsRightOrder() {
  const data = readData();
  const pairs = findPairsArrays(data);
  console.dir(pairs, { depth: null });
}
findPairsPacketsRightOrder();
