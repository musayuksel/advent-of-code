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

function isPairsContainOther(pair) {
  // pair = { leftStart: 2, leftEnd: 8, rightStart: 3, rightEnd: 7 }
  // isLeftContainRight = 3 >=2 && 7 <= 8
  // isRightContainLeft = 2 >= 3 && 8 <= 7
  const { leftStart, leftEnd, rightStart, rightEnd } = pair;
  const isLeftContainRight = rightStart >= leftStart && rightEnd <= leftEnd;
  const isRightContainLeft = leftStart >= rightStart && leftEnd <= rightEnd;
  return isLeftContainRight || isRightContainLeft;
}

function findPairsContainOther() {
  const pairs = readData();
  const slicedTexts = sliceText(pairs);
  const pairsContainOther = slicedTexts.filter(isPairsContainOther);
  //   console.log({ pairs, slicedTexts,pairsContainOther });
  return pairsContainOther.length;
}

console.log({ pairsLengthContainOther: findPairsContainOther() });
