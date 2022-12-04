//read the data from the file
// slice each line into 2 parts
//look at the first part of each line and compare each char with the second part of each line
//if the second part includes the first part char then add that char and its value to the object
// find the sum of the values in the object
function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}

function sliceText(textArray) {
  //[{left:'vJrwpWtwJgWr', right:'JgWr'}]
  return textArray.map((text) => ({
    left: text.slice(0, text.length / 2),
    right: text.slice(text.length / 2),
  }));
}

function findTheCommonLettersAndValues(slicedTextArray) {
  const allLetters = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return slicedTextArray.map((slicedText) => {
    const commonLettersAndValues = {};
    slicedText.left.split('').forEach((letter) => {
      if (
        slicedText.right.includes(letter) &&
        !commonLettersAndValues[letter]
      ) {
        commonLettersAndValues[letter] = allLetters.indexOf(letter);
      }
    });
    return commonLettersAndValues;
  });
}

function findTotalValueOfOneObject(object) {
  //if one object includes more than one common char {A: 1, B: 2} => 3
  return Object.values(object).reduce((sum, value) => sum + value, 0);
}

function sumOfPriorityItems() {
  const data = readData();
  const slicedTexts = sliceText(data);
  const commonLettersAndValues = findTheCommonLettersAndValues(slicedTexts);
  console.log({ commonLettersAndValues });

  return commonLettersAndValues.reduce((sum, object) => {
    return sum + findTotalValueOfOneObject(object);
  }, 0);
}

// console.log(sumOfPriorityItems());

// ------------ Part 2
//Group data by 3 lines
// find the common letters and values for each group
//find the total value of each group

function groupDataByThreeLines(data) {
  const groupedData = [];
  for (let i = 0; i < data.length; i += 3) {
    groupedData.push(data.slice(i, i + 3));
  }
  return groupedData;
}

function findTheCommonLettersAndValuesForGroup(groupedData) {
    const allLetters = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return groupedData.map((group) => {
        const commonLettersAndValues = {};
        group[0].split('').forEach((letter) => {
        if (
            group[1].includes(letter) &&
            group[2].includes(letter) &&
            !commonLettersAndValues[letter]
        ) {
            commonLettersAndValues[letter] = allLetters.indexOf(letter);
        }
        });
        return commonLettersAndValues;
    });
}

function sumOfGroupedData() {
    const data = readData();
    const groupedData = groupDataByThreeLines(data);
    const commonLettersAndValues = findTheCommonLettersAndValuesForGroup(groupedData);
    console.log({ commonLettersAndValues });

    return commonLettersAndValues.reduce((sum, object) => {
        return sum + findTotalValueOfOneObject(object);
    }, 0);
}
console.log(sumOfGroupedData())