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

const moveUpRight = (position) => moveOneUp(moveOneRight(position));
const moveUpLeft = (position) => moveOneUp(moveOneLeft(position));
const moveDownRight = (position) => moveOneDown(moveOneRight(position));
const moveDownLeft = (position) => moveOneDown(moveOneLeft(position));

//Current Tail: [1,1] & current Head: [1,3] => Diff: [0,2] Right
// Diff [0,-2] Left
// Diff [-2,0] Up
// Diff [2,0] Down
// Diff [-2,1] || [-1,2] UpRight
// Diff [-2,-1] || [-1,-2] UpLeft
// Diff [2,1] || [1,2] DownRight
// Diff [2,-1] || [1,-2] DownLeft

function findTailsMoveDirection(tail, head) {
  const [rowIndexDiff, colIndexDiff] = [head[0] - tail[0], head[1] - tail[1]];
  if (rowIndexDiff === 0 && colIndexDiff === 2) return 'R';
  if (rowIndexDiff === 0 && colIndexDiff === -2) return 'L';
  if (rowIndexDiff === -2 && colIndexDiff === 0) return 'U';
  if (rowIndexDiff === 2 && colIndexDiff === 0) return 'D';
  if (rowIndexDiff === -2 && colIndexDiff === 1) return 'UR';
  if (rowIndexDiff === -1 && colIndexDiff === 2) return 'UR';
  if (rowIndexDiff === -2 && colIndexDiff === -1) return 'UL';
  if (rowIndexDiff === -1 && colIndexDiff === -2) return 'UL';
  if (rowIndexDiff === 2 && colIndexDiff === 1) return 'DR';
  if (rowIndexDiff === 1 && colIndexDiff === 2) return 'DR';
  if (rowIndexDiff === 2 && colIndexDiff === -1) return 'DL';
  if (rowIndexDiff === 1 && colIndexDiff === -2) return 'DL';
  return 'Stay';
}

function findDirectionFunction(direction) {
  switch (direction) {
    case 'R':
      return moveOneRight;
    case 'L':
      return moveOneLeft;
    case 'U':
      return moveOneUp;
    case 'D':
      return moveOneDown;
    case 'UR':
      return moveUpRight;
    case 'UL':
      return moveUpLeft;
    case 'DR':
      return moveDownRight;
    case 'DL':
      return moveDownLeft;
    default:
      return () => {};
  }
}


function findVisitedGrids() {
  const movesString = readData();
  const moves = convertDataToMoves(movesString);
  console.log({ moves });
  console.log(findTailsMoveDirection([1, 1], [2, 3]));
}
findVisitedGrids();
