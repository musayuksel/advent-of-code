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



let result =false;
function isPairsRightOrder(leftArray, rightArray){
  // const [leftArray, rightArray] = pair;
  console.log('>>>>>>>>>>',{leftArray,rightArray})
 for (let i = 0; i < leftArray.length; i++) {
    const leftNumber = leftArray[i];
    const rightNumber = rightArray[i];
  
  if(typeof leftNumber === 'object' && typeof rightNumber === 'object') {
    // if(!isPairsRightOrder(leftNumber,rightNumber)) return false;
    // continue;
    console.log('both are objects')
     isPairsRightOrder(leftNumber,rightNumber);
  }

  if(typeof leftNumber === 'object' && typeof rightNumber !== 'object') {
    console.log('left is object')
    isPairsRightOrder(leftNumber,rightArray);
  }

  if(typeof leftNumber !== 'object' && typeof rightNumber === 'object') {
    console.log('right is object')
    isPairsRightOrder(leftArray,rightNumber);
  }
  if(typeof rightNumber === 'undefined') {result=true}

  if(leftNumber < rightNumber) {result=true}
  if(leftNumber > rightNumber) return false;
  if(leftNumber === rightNumber) continue;
 }
    
}
// console.log(isPairsRightOrder([[1],[2,3,4]],[[1],4]))
console.log(isPairsRightOrder([[1],[2,3,4]], [[1],4]))
console.log({result})
function findPairsPacketsRightOrder() {
  const data = readData();
  const pairs = findPairsArrays(data);
    console.dir(pairs, { depth: null });

  // const pairsArray = pairs.map(([left, right]) => [
  //   convertStringsToComparableArray(left),
  //   convertStringsToComparableArray(right),
  // ]);

  // const rightOrderPairsIndexNumbers = [];

  // pairsArray.forEach((pair, index) => {
  //   isPairsRightOrder(pair) && rightOrderPairsIndexNumbers.push(index + 1);
  // });

  // const sumOfIndexNumbers = rightOrderPairsIndexNumbers.reduce((acc, item) => acc + item,0);
  // console.log({rightOrderPairsIndexNumbers,sumOfIndexNumbers});
}
// findPairsPacketsRightOrder();
