//read the data from the file
// slice each line into 2 parts
//look at the first part of each line and compare each char with the second part of each line
//if the second part includes the first part char then add that char and its value to the object
// find the sum of the values in the object
function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function sliceText(textArray) {
  //{left:'vJrwpWtwJgWr', right:'JgWr'}
  return textArray.map((text) => ({
    left: text.slice(0, text.length / 2),
    right: text.slice(text.length / 2),
  }));
}

console.log(sliceText(readData()));
