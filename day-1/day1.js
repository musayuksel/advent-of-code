//get the data from the file
// convert it to 2D array ([[1000,2000,3000],[4000]])
// loop through the array and find totals [[1000,2000,3000],[4000]] => [6000,4000]
// find the max of the totals

function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function convertTo2DArray(calories) {
  const data2D = [[]];
  calories.forEach((calorie) => {
    if (calorie === '') {
      data2D.push([]);
    } else {
      data2D[data2D.length - 1].push(+calorie);
    }
  });
  // console.log(data2D);
  return data2D;
}

function findTotals(calories2D) {
 return  calories2D.map(calories => calories.reduce((sum, calorie) => sum + calorie, 0));
}

console.log(findTotals(convertTo2DArray(readData())));
console.log(findTotals([[1000,2000,3000],[4000]]));