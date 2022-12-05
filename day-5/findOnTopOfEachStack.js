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

function findOnTopOfEachStack() {
  const [stack, moves] = sliceDataIntoStackAndMoves(readData());
  const stackNumbers = stack.pop().split(''); // [' ', '1', ' ', ' ',' ', '2', ' ', ' ',' ', '3', ' ']
  console.log({ stack, moves, stackNumbers });
}
findOnTopOfEachStack();
console.log(
  readData()[2]
    .split('')
    .map((text, index) => `index: ${index} text: ${text}`)
);
