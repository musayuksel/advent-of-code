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
      inspectedItems: 0,
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

    monkeyObjects[throwMonkeyNumber].monkeyItemsWorryLevels.push(newWorryLevel);
    currentMonkey.inspectedItems++;
  });
  currentMonkey.monkeyItemsWorryLevels = [];
}

function findMonkeyBusiness() {
  const data = readData();
  const monkeyObjects = convertDataToReadableObject(data);
//run 20 times
  for (let i = 0; i < 20; i++) {
    monkeyObjects.forEach((monkey) => testForOneMonkey(monkeyObjects, monkey));
  }
  // console.dir(monkeyObjects, { depth: null });
  //find inspected items
  const inspectedItems = monkeyObjects.map((monkey) => monkey.inspectedItems).sort((a,b) => b-a);
  const monkeyBusiness = inspectedItems[0] * inspectedItems[1];
  console.log({ monkeyBusiness  });
  return monkeyBusiness;
}
findMonkeyBusiness();
