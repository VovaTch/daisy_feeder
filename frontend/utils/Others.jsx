/**
 * Generates a random string of characters. Used for generate random ids.
 * @param {number} length Length of the string.
 * @returns A random string of characters with a length `length`.
 */

export function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
    runningArray = [
      ...runningArray,
      new Date(feedItemData[idx].datetime).toISOString().split("T")[0],
    ];
  }
  return runningArray;
}

export function getUniqueDateArray(dateArray) {
  return [...new Set(dateArray)];
}

export function getDateDropdownData(dateArray) {
  let runningArray = [];
  for (let idx = 0; idx < dateArray.length; idx++) {
    runningArray = [
      ...runningArray,
      {
        label: dateArray[idx],
        value: dateArray[idx],
      },
    ];
  }
  return runningArray;
}

export function getDateFilteredFoodItems(foodItems, requiredDate) {
  return foodItems.filter((item) => {
    const itemDate = new Date(item.datetime).toISOString().split("T")[0];
    return itemDate === requiredDate;
  });
}

export function getReverseFilteredFoodItems(foodItems, exceptDate) {
  return foodItems.filter((item) => {
    const itemDate = new Date(item.datetime).toISOString().split("T")[0];
    return itemDate !== exceptDate;
  });
}

export function identifyInputType(input) {
  // Regular expression to check for email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(input)) {
    return "email";
  } else {
    return "username";
  }
}

export function getUsernameById(minUsers, id) {
  const selectedUser = minUsers.find((minUsers) => minUsers.id === id);
  return selectedUser ? selectedUser.username : "";
}

export function getUserFilteredFoodItems(foodItems, activeUser) {
  const sendingIds = [activeUser.id, ...activeUser.profile.friends];
  return foodItems.filter((item) => sendingIds.includes(item.feeder));
}

export function getPendingFriendRequests(friendRequests) {
  return friendRequests.filter((item) => item.pending);
}

export function emailIsValidated(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}
