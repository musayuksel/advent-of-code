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

function findOnTopOfEachStack() {
  const [stack, moves] = sliceDataIntoStackAndMoves(readData());
  const stackNumbers = stack.pop().split(''); // [' ', '1', ' ', ' ',' ', '2', ' ', ' ',' ', '3', ' ']
  const stackObject = prepareStackObject(stack, stackNumbers);
  const movesArray = prepareMovesArray(moves);
  console.log({ stack, moves, stackNumbers, stackObject, movesArray });
}
findOnTopOfEachStack();
