function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function convertDataToMoves(data) {
  return data.map((commandString) => {
    const [commandKey, commandValue] = commandString.split(' ');
    return {
      command: commandKey,
      cycle: commandKey === 'noop' ? 1 : 2,
      value: commandValue === undefined ? 0 : parseInt(commandValue),
    };
  });
}

function findSumOfSignalStrengths(signalStrengths) {
  return signalStrengths.reduce((acc, curr) => acc + curr, 0);
}

function findSignalStrengths() {
  const data = readData();
  const commands = convertDataToMoves(data);

  let currentValue = 1;
  let cycleCounter = 0;
  let signalStrengthPoint = 20;
  const signalStrengths = [];

  commands.forEach((command) => {
    cycleCounter += command.cycle;
    currentValue += command.value;
    if (cycleCounter >= signalStrengthPoint) {
      signalStrengths.push(
        (currentValue - command.value) * signalStrengthPoint
      );
      signalStrengthPoint += 40;
    }
  });

  const sumOfSignalStrengths = findSumOfSignalStrengths(signalStrengths);

  console.log({ sumOfSignalStrengths });
  return sumOfSignalStrengths;
}
findSignalStrengths();

// ------------------------------ Part 2 ------------------------------
function findSignalStrengthsPart2() {
  const data = readData();
  const commands = convertDataToMoves(data);

  let currentValue = 1;
  let cycleCounter = 0;
  let signalStrengthPoint = 20;
  const signalStrengths = [];

  let sprites = new Array(6)
    .fill(new Array(40).fill('.'))
    .map((sprite) => sprite.map((s) => '.'));

  commands.forEach((command) => {
    // lit the pixels
    for (let i = 0; i < command.cycle; i++) {
      const currentCycle = cycleCounter % 40;
      const isPixelLit =
        currentCycle >= currentValue - 1 && currentCycle <= currentValue + 1;
        
      if (isPixelLit) {
        sprites[Math.floor(cycleCounter / 40)][currentCycle] = '#';
      }
      cycleCounter += 1;
    }

    currentValue += command.value;
    if (cycleCounter >= signalStrengthPoint) {
      signalStrengths.push(
        (currentValue - command.value) * signalStrengthPoint
      );
      signalStrengthPoint += 40;
    }
  });

  console.log('RESULT CRT>>>>>>>:');

  sprites.forEach((sprite) => console.log(sprite.join('')));
}
findSignalStrengthsPart2();
