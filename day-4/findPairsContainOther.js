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

function sliceText(textArray) {
  //['2-4,6-8] => [{leftStart: 2, leftEnd: 4, rightStart: 6, rightEnd: 8}]
  return textArray.map((text) => {
    const [left, right] = text.split(',');
    const [leftStart, leftEnd] = left.split('-');
    const [rightStart, rightEnd] = right.split('-');
    return {
      leftStart: Number(leftStart),
      leftEnd: Number(leftEnd),
      rightStart: Number(rightStart),
      rightEnd: Number(rightEnd),
    };
  });
}

function findPairsContainOther() {
  const pairs = readData();
  const slicedTexts = sliceText(pairs);
  console.log({ pairs, slicedTexts });
}

findPairsContainOther();
