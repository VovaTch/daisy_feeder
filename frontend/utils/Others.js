/**
 * Generates a random string of characters. Used for generate random ids.
 * @param {number} length Length of the string.
 * @returns A random string of characters with a length `length`.
 */
export function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getDateArray(feedItemData) {
  let runningArray = [];
  for (let idx = 0; idx < feedItemData.length; idx++) {
    console.log(feedItemData[idx])
    runningArray = [...runningArray,
    new Date(feedItemData[idx].datetime).toISOString().split('T')[0],
    ];
  }
  return runningArray
}

export function getUniqueDateArray(dateArray) {
  return [...new Set(dateArray)]
}

export function getDateDropdownData(dateArray) {
  let runningArray = [];
  for (let idx = 0; idx < dateArray.length; idx++) {
    runningArray = [...runningArray, {
      label: dateArray[idx],
      value: dateArray[idx],
    }];
  }
  console.log(runningArray);
  return runningArray;
}

export function getFilteredFoodItems(foodItems, requiredDate) {
  return foodItems.filter(item => {
    const itemDate = new Date(item.datetime).toISOString().split('T')[0];
    return itemDate === requiredDate
  });
}

