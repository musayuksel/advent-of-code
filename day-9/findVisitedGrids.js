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

function findVisitedGrids(commands) {
  const movesString = readData();
  const moves = convertDataToMoves(movesString);

  console.log({ moves });
}
findVisitedGrids();
