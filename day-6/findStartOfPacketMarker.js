function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString;
}

function findFirstUniqueMarkerIndex(data) {
  for (let i = 0; i < data.length; i++) {
    const fourCharacters = data.slice(i, i + 4);
    if (isStringUnique(fourCharacters)) {
      return i + 4; //+4 because we want to return the index of the last character of the marker
    }
  }
}

function isStringUnique(string) {
  const stringArray = string.split('');
  const uniqueCharacters = [...new Set(stringArray)];
  return uniqueCharacters.length === stringArray.length;
}

function findStartOfPacketMarker() {
  const data = readData();
  const firstUniqueMarkerIndex = findFirstUniqueMarkerIndex(data);
  console.log({ data, firstUniqueMarkerIndex });
  return firstUniqueMarkerIndex;
}
findStartOfPacketMarker();
