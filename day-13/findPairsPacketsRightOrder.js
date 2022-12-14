function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n\n');
}

function findPairsArrays(data) {
  return data.map((item) => {
    const [left, right] = item.split('\n');
    // return [eval(left), eval(right)];
    return [left, right];
  });
}

function convertStringsToComparableArray(stringArray) {
  //[[[123]] =>[Infinity,Infinity,Infinity,123]
  // [1,[15],3,1,1] => [Infinity, 1, Infinity, 15, 3, 1, 1 ]
  const newArray = [];
  const numbers = '1234567890';
  const stringChars = stringArray.split('');
  let currentIndex = 0;
  while (currentIndex < stringChars.length) {
    const currentChar = stringChars[currentIndex];
    if (currentChar === '[') {
      newArray.push(Infinity);
    } else if (numbers.includes(currentChar)) {
      let nextSliceIndex = stringArray.indexOf(',', currentIndex);
      const nextBreakIndex = stringArray.indexOf(']', currentIndex);
      if (nextSliceIndex === -1) {
        nextSliceIndex = nextBreakIndex;
      } else if (nextSliceIndex > nextBreakIndex) {
        nextSliceIndex = nextBreakIndex;
      }
      const nextNum = stringArray.slice(currentIndex, nextSliceIndex);
      newArray.push(+nextNum);

      currentIndex = nextSliceIndex;
    }
    currentIndex++;
  }
  return newArray;
}

function isPairsRightOrder(pair) {
  const [leftArray, rightArray] = pair;
  console.log({ leftArray, rightArray });

  while (true) {
    const leftNumber = leftArray.shift();
    const rightNumber = rightArray.shift();

    if (leftNumber === undefined) {
      console.log('LEFT side ran out of items', { leftNumber, rightNumber });
      if (leftNumber > rightNumber) return false;
      return true;
    }
    if (rightNumber === undefined) {
      console.log('Right side ran out of items:', { leftNumber, rightNumber });
      return false;
    }
    if (leftNumber === Infinity && rightNumber === Infinity) continue;
    if (leftNumber === Infinity && rightNumber !== Infinity) {
      //push right number back
      rightArray.unshift(rightNumber);
      continue;
    }
    if (leftNumber !== Infinity && rightNumber === Infinity) {
      //push left number back
      leftArray.unshift(leftNumber);
      continue;
    }
    if (leftNumber !== Infinity && rightNumber !== Infinity) {
      if (leftNumber > rightNumber) return false;
      if (leftNumber === rightNumber) continue;
      return true;
    }
  }
}

function findPairsPacketsRightOrder() {
  const data = readData();
  const pairs = findPairsArrays(data);

  const pairsArray = pairs.map(([left, right]) => [
    convertStringsToComparableArray(left),
    convertStringsToComparableArray(right),
  ]);

  console.log(pairsArray.map(isPairsRightOrder));
  //   console.dir(pairsArray, { depth: null });
}
findPairsPacketsRightOrder();
