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
console.log(readData(), {
  findTotalScore: findTotalScore(),
}); //[ 'A Y', 'B X', 'C Z' ] { findTotalScore: 15 }

//------------ Part 2

function findTotalScoreWithNewMoves() {
  const newMoves = {
    'A X': 'A Z', // X will lose so change it to Z
    'A Y': 'A X',
    'A Z': 'A Y',
    'B X': 'B X',
    'B Y': 'B Y',
    'B Z': 'B Z',
    'C X': 'C Y',
    'C Y': 'C Z',
    'C Z': 'C X',
  };
  const data = readData();
  const movesAfterNewStrategy = data.map((move) => newMoves[move]);

  return movesAfterNewStrategy.reduce(
    (sum, roundMove) => sum + possibleCombinations[roundMove],
    0
  );
}
console.log({
  findTotalScoreWithNewMoves: findTotalScoreWithNewMoves(),
}); //[ 'A Y', 'B X', 'C Z' ] { findTotalScore: 12 }
