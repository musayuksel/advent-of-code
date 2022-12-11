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
      test,
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
      test: test.split(': ')[1],
      ifTrue: ifTrue.split(': ')[1],
      ifFalse: ifFalse.split(': ')[1],
    };
  });
}

function findMonkeyBusiness() {
  const data = readData();
  const eachMonkey = convertDataToReadableObject(data);
  console.log({ eachMonkey });
}
findMonkeyBusiness();
