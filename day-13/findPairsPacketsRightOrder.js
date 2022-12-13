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
      console.log({ nextNum });
      newArray.push(+nextNum);
      currentIndex = nextSliceIndex;
    }
    currentIndex++;
  }
  console.log({ newArray });
}

function findPairsPacketsRightOrder() {
  const data = readData();
  const pairs = findPairsArrays(data);
  //   console.dir(pairs, { depth: null });
  convertStringsToComparableArray('[1,[15],3,1,1]');
  convertStringsToComparableArray('[[[123]]]');
}
findPairsPacketsRightOrder();
