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
    // return [left, right];
  });
}

let result = false;
function isPairsRightOrder(leftArray, rightArray) {
  // const [leftArray, rightArray] = pair;
  // console.log('START>>>>>>>>>>',{leftArray,rightArray})
  if (leftArray.length === 0 && rightArray.length > 0) {
    result = true;
  }
  // if(leftArray.length ===0 && rightArray.length ===0) result= true;
  for (let i = 0; i < leftArray.length; i++) {
    const leftNumber = leftArray[i];
    const rightNumber = rightArray[i];
    // console.log('COMPARE>>>>>>>>>>',{leftNumber,rightNumber})
    if (typeof rightNumber === undefined) {
      result = false;
      return false;
    }
    if (typeof leftNumber === 'object' && typeof rightNumber === 'object') {
      // console.log('both are objects');
      isPairsRightOrder(leftNumber, rightNumber);
    }

    if (typeof leftNumber === 'object' && typeof rightNumber !== 'object') {
      // console.log('left is object');
      isPairsRightOrder(leftNumber, rightArray.slice(i));
    }

    if (typeof leftNumber !== 'object' && typeof rightNumber === 'object') {
      // console.log('right is object');
      isPairsRightOrder(leftArray.slice(i), rightNumber);
    }

    // console.log("first")
    if (leftNumber < rightNumber) {
      result = true;
      return true;
    }
    if (leftNumber > rightNumber) return false;
    if (i === leftArray.length - 1 && rightArray[i + 1] !== undefined) {
      // console.log(">>>>>",rightArray[i+1])
      result = true;
      return true;
    }
    if (leftNumber === rightNumber) continue;
  }
}

findPairsPacketsRightOrder();
function findPairsPacketsRightOrder() {
  const data = readData();
  const pairs = findPairsArrays(data);
  // console.dir(pairs, { depth: null });
  let total = 0;
  pairs.forEach((pair, index) => {
    const [leftArray, rightArray] = pair;
    isPairsRightOrder(leftArray, rightArray);
    console.log({ leftArray, rightArray, result });
    if (result) total += index + 1;
    result = false;
  });
  console.log({ total });
}
// findPairsPacketsRightOrder();
