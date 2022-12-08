function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function convertDataTo2DGrid(data) {
  //['30373'] => [[{hight:3, rowIndex:0, columnIndex:0}], [{hight:0, rowIndex:0, columnIndex:1}], [{hight:3, rowIndex:0, columnIndex:2}], [{hight:7, rowIndex:0, columnIndex:3}], [{hight:3, rowIndex:0, columnIndex:4}]]
  return data.map((row, rowIndex) => {
    return row.split('').map((column, columnIndex) => ({
      hight: parseInt(column),
      rowIndex,
      columnIndex,
    }));
  });
}

function oneUpHight(rowIndex, columnIndex, grid) {
  return grid[rowIndex - 1]?.[columnIndex].hight;
}

function oneDownHight(rowIndex, columnIndex, grid) {
  return grid[rowIndex + 1]?.[columnIndex].hight;
}

function oneLeftHight(rowIndex, columnIndex, grid) {
  return grid[rowIndex]?.[columnIndex - 1]?.hight;
}

function oneRightHight(rowIndex, columnIndex, grid) {
  return grid[rowIndex]?.[columnIndex + 1]?.hight;
}

function findAllHightsAboveOfCurrentTree(
  currentRowIndex,
  currentColumnIndex,
  grid
) {
  const hightsAboveCurrentTree = [];
  while (currentRowIndex > 0) {
    const oneUpH = oneUpHight(currentRowIndex, currentColumnIndex, grid);
    if (oneUpH !== undefined) {
      hightsAboveCurrentTree.push(oneUpH);
    }
    currentRowIndex--;
  }
  return hightsAboveCurrentTree;
}

function findTreesVisibleOutside() {
  const data = readData();
  const grid = convertDataTo2DGrid(data);
  console.log({ data });
  //   console.dir(grid, { depth: null });
//   console.log(findAllHighsBlowOfCurrentTree(3, 4, grid));
  console.log(findAllHightsAboveOfCurrentTree(1, 1, grid));
}
findTreesVisibleOutside();
