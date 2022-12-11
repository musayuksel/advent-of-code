function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n\n');
}

function convertDataToReadableObject(data) {
  // {
  //     monkeyNumber: 0,
  //     monkeyItemsWorryLevels:[79,98],
  //     operation:'old * 19',
  //     test: 'divisible by 23'
  //     ifTrue: 'throw to monkey 2',
  //     ifFalse: 'throw to monkey 3'
  //   }

  return data.map((monkeyData) => {
    const [
      monkeyNumber,
      monkeyItemsWorryLevels,
      operation,
      divisible,
      ifTrue,
      ifFalse,
    ] = monkeyData.split('\n');
    return {
      monkeyNumber,
      monkeyItemsWorryLevels: monkeyItemsWorryLevels
        .split(': ')[1]
        .split(', ')
        .map((item) => parseInt(item)),
      operation: operation.split('= ')[1],
      divisibleTest: parseInt(divisible.split('divisible by ')[1]),
      ifTrueThrowTo: parseInt(ifTrue.split('throw to monkey ')[1]),
      ifFalseThrowTo: parseInt(ifFalse.split('throw to monkey ')[1]),
    };
  });
}

function testForOneMonkey(monkeyObjects, currentMonkey) {
  currentMonkey.monkeyItemsWorryLevels.forEach((worryLevel) => {
    const operationString = currentMonkey.operation.replaceAll('old', worryLevel)
    const operationResult = eval(operationString);

    const newWorryLevel = parseInt(operationResult / 3);

    const isTestTrue = newWorryLevel % currentMonkey.divisibleTest === 0;

    const throwMonkeyNumber = isTestTrue
      ? currentMonkey.ifTrueThrowTo
      : currentMonkey.ifFalseThrowTo;

      console.log(`${newWorryLevel} divisible by ${currentMonkey.divisibleTest} ....${isTestTrue}`)
      console.log(newWorryLevel,'>>>will be thrown to monkey',throwMonkeyNumber)
        
    monkeyObjects[throwMonkeyNumber].monkeyItemsWorryLevels.push(newWorryLevel);
  });
  currentMonkey.monkeyItemsWorryLevels = [];
}

function findMonkeyBusiness() {
  const data = readData();
  const monkeyObjects = convertDataToReadableObject(data);
  testForOneMonkey(monkeyObjects, monkeyObjects[0]);
  testForOneMonkey(monkeyObjects, monkeyObjects[1]);
  testForOneMonkey(monkeyObjects, monkeyObjects[2]);
  console.dir(monkeyObjects, { depth: null });
}
findMonkeyBusiness();
