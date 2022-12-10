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

function findSignalStrengths() {
  const data = readData();
  const commands = convertDataToMoves(data);
  console.log({ commands });
}
findSignalStrengths();
