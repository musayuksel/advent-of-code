function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function findMonkeyBusiness() {
  const data = readData();
  console.log({ data });
}
findMonkeyBusiness();
