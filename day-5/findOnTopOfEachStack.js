function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function sliceDataIntoStackAndMoves(data) {
  //  stack=[
  //   '    [D]    ',
  //   '[N] [C]    ',
  //   '[Z] [M] [P]',
  //   ' 1   2   3 ']
  //  moves=[
  //   'move 1 from 2 to 1',
  //   'move 3 from 1 to 3',
  //   'move 2 from 2 to 1',
  //   'move 1 from 1 to 2'
  // ]
  const indexOfEmpty = data.findIndex((text) => text === '');
  return ([stack, moves] = [
    data.slice(0, indexOfEmpty),
    data.slice(indexOfEmpty + 1),
  ]);
}

function prepareStackObject(stack, stackNumbers) {
  // stackObject = { '1':['N','Z'], '2':['D','C','M'], '3':['P'] }
  // new item will be added to the top of the stack
  // first index will be the top of the stack and will shift first //LIFO
  const stackObject = {};
  stackNumbers.forEach((number, index) => {
    if (number !== ' ') {
      if (!stackObject[number]) {
        stackObject[number] = [];
      }
      stack.forEach((stackLine) => {
        //if stackLine[index] is not empty
        //then push it to stackObject[number]
        if (stackLine[index] !== ' ') {
          stackObject[number].push(stackLine[index]);
        }
      });
    }
  });
  return stackObject;
}

function prepareMovesArray(moves) {
  // moves = ['move 1 from 2 to 1', 'move 3 from 1 to 3', 'move 2 from 2 to 1', 'move 1 from 1 to 2']
  // movesArray = [{moveCount: '1', from: '2', to: '1'}, {moveCount: '3', from: '1', to: '3'}, {moveCount: '2', from: '2', to: '1'}, {moveCount: '1', from: '1', to: '2'}]
  return moves.map((move) => {
    const [space1, moveCount, space2, from, space3, to] = move.split(' ');
    return { moveCount: +moveCount, from, to };
  });
}

function moveAllItems(stackObject, movesArray) {
  movesArray.forEach((move) => {
    for (let i = 0; i < move.moveCount; i++) {
      const item = stackObject[move.from].shift();
      !!item && stackObject[move.to].unshift(item);
    }
  });
}

function getTopOfEachStack(stackObject) {
  // stackObject = { '1':['N','Z'], '2':['D','C','M'], '3':['P'] }
  // topOfEachStack = ['N', 'D', 'P']
  const topOfEachStack = [];
  for (const key in stackObject) {
    stackObject[key][0] && topOfEachStack.push(stackObject[key][0]);
  }
  return topOfEachStack.join('');
}

function findOnTopOfEachStack() {
  const [stack, moves] = sliceDataIntoStackAndMoves(readData());
  const stackNumbers = stack.pop().split(''); // [' ', '1', ' ', ' ',' ', '2', ' ', ' ',' ', '3', ' ']
  const stackObject = prepareStackObject(stack, stackNumbers);
  const movesArray = prepareMovesArray(moves);
  moveAllItems(stackObject, movesArray);
  const topOfEachStack = getTopOfEachStack(stackObject);
  //   console.log({ stack, moves, stackNumbers, stackObject, movesArray });
  console.log({ topOfEachStack });
}
// findOnTopOfEachStack();

// ----------------------------Part 2---------------------------

function moveAllItemsPart2(stackObject, movesArray) {

  movesArray.forEach((move) => {
    const fromStack = [];
    for (let i = 0; i < move.moveCount; i++) {
      const item = stackObject[move.from].shift();
        !!item && fromStack.push(item);
    }
    fromStack.length > 0 && stackObject[move.to].unshift(...fromStack);
});
}

function findOnTopOfEachStackPart2() {
    const [stack, moves] = sliceDataIntoStackAndMoves(readData());
    const stackNumbers = stack.pop().split(''); // [' ', '1', ' ', ' ',' ', '2', ' ', ' ',' ', '3', ' ']
    const stackObject = prepareStackObject(stack, stackNumbers);
    const movesArray = prepareMovesArray(moves);
    // console.log({  stackObjectBEFORE: stackObject });
    moveAllItemsPart2(stackObject, movesArray);
    const topOfEachStack = getTopOfEachStack(stackObject);
    //   console.log({  movesArray,stackObject });
    console.log({ topOfEachStackPART2:topOfEachStack });
  }
  findOnTopOfEachStackPart2();