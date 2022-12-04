// read data and split from comma ,
// for each group split from dash '-' and convert to number
// if second number includes first number or vise versa, filter them out
//return the length of the array
function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function findPairsContainOther() {
  const pairs = readData();
  console.log({ pairs });
}

findPairsContainOther();
