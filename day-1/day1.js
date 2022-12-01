//get the data from the file
// convert it to 2D array ([[1000,2000,3000],[4000]])
// loop through the array and find totals [[1000,2000,3000],[4000]] => [6000,4000]
// find the max of the totals

function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  console.log({ dataString: dataString.split('\n') });
}
readData();
