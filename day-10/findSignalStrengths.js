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
// findSignalStrengths();


// ------------------------------ Part 2 ------------------------------ 
function findSignalStrengthsPart2() {
  const data = readData();
  const commands = convertDataToMoves(data);

  let currentValue = 1;//16
  let cycleCounter = 0;
  let spriteCounter = 0;
  let signalStrengthPoint = 20;
  const signalStrengths = [];

  const sprites = new Array(6).fill(new Array(40).fill('.')) 


  
  commands.forEach((command) => {
    console.log({currentValue})
    for (let i = 0; i < command.cycle; i++) {
      if(spriteCounter >=currentValue-1 && spriteCounter <= currentValue+1){
        sprites[Math.floor(cycleCounter/40)][spriteCounter ] = '#';
      }
      spriteCounter += 1;
    }
    // sprites.push(newSprites.join(''))

    cycleCounter += command.cycle;
    currentValue += command.value;
    if (cycleCounter >= signalStrengthPoint) {
      signalStrengths.push(
        (currentValue - command.value) * signalStrengthPoint
      );
      signalStrengthPoint += 40;
    }
  });
  console.log({commands,signalStrengths} )

sprites.forEach(sprite => console.log(sprite.join('')))
  const sumOfSignalStrengths = findSumOfSignalStrengths(signalStrengths);

  console.log({ sumOfSignalStrengths });
  return sumOfSignalStrengths;
}
findSignalStrengthsPart2();
