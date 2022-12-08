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

function findAllHighsBlowOfCurrentTree(
  currentRowIndex,
  currentColumnIndex,
  grid
) {
  const hightsBlowCurrentTree = [];
  while (currentRowIndex < grid.length - 1) {
    const oneDownH = oneDownHight(currentRowIndex, currentColumnIndex, grid);
    if (oneDownH !== undefined) {
      hightsBlowCurrentTree.push(oneDownH);
    }
    currentRowIndex++;
  }
  return hightsBlowCurrentTree;
}

function findAllHightsLeftOfCurrentTree(
  currentRowIndex,
  currentColumnIndex,
  grid
) {
  const hightsLeftOfCurrentTree = [];
  while (currentColumnIndex > 0) {
    const oneLeftH = oneLeftHight(currentRowIndex, currentColumnIndex, grid);
    if (oneLeftH !== undefined) {
      hightsLeftOfCurrentTree.push(oneLeftH);
    }
    currentColumnIndex--;
  }
  return hightsLeftOfCurrentTree;
}

function findAllHightsRightOfCurrentTree(
  currentRowIndex,
  currentColumnIndex,
  grid
) {
  const hightsRightOfCurrentTree = [];
  while (currentColumnIndex < grid[currentRowIndex].length - 1) {
    const oneRightH = oneRightHight(currentRowIndex, currentColumnIndex, grid);
    if (oneRightH !== undefined) {
      hightsRightOfCurrentTree.push(oneRightH);
    }
    currentColumnIndex++;
  }
  return hightsRightOfCurrentTree;
}

function findTreesWithHights(grid) {
  return grid.flat().map((tree) => {
    //find all trees' hights (above, blow, left, right)
    // {
    //     hight: 3,
    //     rowIndex: 0,
    //     columnIndex: 0,
    //     hightsAboveCurrentTree: [],
    //     hightsBlowCurrentTree: [ 2, 6, 3, 3 ],
    //     hightsLeftOfCurrentTree: [],
    //     hightsRightOfCurrentTree: [ 0, 3, 7, 3 ]
    //   }
    const { rowIndex, columnIndex } = tree;
    const hightsAboveCurrentTree = findAllHightsAboveOfCurrentTree(
      rowIndex,
      columnIndex,
      grid
    );
    const hightsBlowCurrentTree = findAllHighsBlowOfCurrentTree(
      rowIndex,
      columnIndex,
      grid
    );
    const hightsLeftOfCurrentTree = findAllHightsLeftOfCurrentTree(
      rowIndex,
      columnIndex,
      grid
    );
    const hightsRightOfCurrentTree = findAllHightsRightOfCurrentTree(
      rowIndex,
      columnIndex,
      grid
    );
    return {
      ...tree,
      hightsAboveCurrentTree,
      hightsBlowCurrentTree,
      hightsLeftOfCurrentTree,
      hightsRightOfCurrentTree,
    };
  });
}

function isHighBiggestThanHights(hight, hights) {
  return hights.every((currentHight) => hight > currentHight);
}

function filterTreesVisibleOutside(treesWithHights) {
  return treesWithHights.filter((tree) => {
    const {
      hight,
      hightsAboveCurrentTree,
      hightsBlowCurrentTree,
      hightsLeftOfCurrentTree,
      hightsRightOfCurrentTree,
    } = tree;

    const isBiggerThanHightsAbove = isHighBiggestThanHights(
      hight,
      hightsAboveCurrentTree
    );

    const isBiggerThanHightsBlow = isHighBiggestThanHights(
      hight,
      hightsBlowCurrentTree
    );

    const isBiggerThanHightsLeft = isHighBiggestThanHights(
      hight,
      hightsLeftOfCurrentTree
    );

    const isBiggerThanHightsRight = isHighBiggestThanHights(
      hight,
      hightsRightOfCurrentTree
    );

    return (
      isBiggerThanHightsAbove ||
      isBiggerThanHightsBlow ||
      isBiggerThanHightsLeft ||
      isBiggerThanHightsRight
    );
  });
}


function findTreesVisibleOutside() {
  const data = readData();
  const grid = convertDataTo2DGrid(data);
  const treesWithHights = findTreesWithHights(grid);

  //filter treesWithHights that have bigger hights from above || blow || left || right
  const treesVisibleOutside = filterTreesVisibleOutside(treesWithHights);
  console.log({ treesVisibleOutsideCount: treesVisibleOutside.length });
  return treesVisibleOutside.length;
}
findTreesVisibleOutside();

// ------------------------------ Part 2 ------------------------------

function findTreesVisibleOutsidePart2() {}
// findTreesVisibleOutsidePart2();
