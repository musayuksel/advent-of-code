function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}
function convertDataToMoves(data) {
  return data.map((moveString) => {
    const [direction, moveCount] = moveString.split(' ');
    return { direction, moveCount: parseInt(moveCount) };
  });
}

// [1,1] => [1,2]
const moveOneRight = (position) => [position[0], position[1] + 1];

// [1,1] => [1,0]
const moveOneLeft = (position) => [position[0], position[1] - 1];

// [1,1] => [0,1]
const moveOneUp = (position) => [position[0] - 1, position[1]];

// [1,1] => [2,1]
const moveOneDown = (position) => [position[0] + 1, position[1]];

function findVisitedGrids(commands) {
  const movesString = readData();
  const moves = convertDataToMoves(movesString);
  console.log(moveOneDown([1, 1]))
  console.log({ moves });
}
findVisitedGrids();
