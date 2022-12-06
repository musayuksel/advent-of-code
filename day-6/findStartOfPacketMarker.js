function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString;
}

function findFirstUniqueMarkerIndex(data) {
  for (let i = 0; i < data.length; i++) {
    const fourCharacters = data.slice(i, i + 4);
    console.log({ fourCharacters }, isStringUnique(fourCharacters));
  }
}

function isStringUnique(string) {
  const stringArray = string.split('');
  const uniqueCharacters = [...new Set(stringArray)];
  return uniqueCharacters.length === stringArray.length;
}

function findStartOfPacketMarker() {
  const data = readData();
  console.log({ data });
  findFirstUniqueMarkerIndex(data);
}
findStartOfPacketMarker();
