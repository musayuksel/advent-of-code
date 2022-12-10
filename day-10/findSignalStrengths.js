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
