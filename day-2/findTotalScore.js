function readData() {
    const fs = require('fs');
    const buffer = fs.readFileSync('data.txt', 'utf8');
    const dataString = buffer.toString();
    return dataString.split('\n');
  }
console.log(readData());  