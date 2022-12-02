function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

const possibleCombinations = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
};

function findTotalScore() {
  const data = readData();
  return data.reduce(
    (sum, roundMove) => sum + possibleCombinations[roundMove],
    0
  );
}
console.log(readData(), {findTotalScore:findTotalScore()});//[ 'A Y', 'B X', 'C Z' ] { findTotalScore: 15 }