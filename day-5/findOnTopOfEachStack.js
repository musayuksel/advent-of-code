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

function findOnTopOfEachStack() {
  const [stack, moves] = sliceDataIntoStackAndMoves(readData());
  const stackNumbers = stack.pop().split(''); // [' ', '1', ' ', ' ',' ', '2', ' ', ' ',' ', '3', ' ']
  const stackObject = prepareStackObject(stack, stackNumbers);
  console.log({ stack, moves, stackNumbers, stackObject });
}
findOnTopOfEachStack();