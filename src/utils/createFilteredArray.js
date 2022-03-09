export const createFilteredArray = (array, startIndex, endIndex) => {
  const filteredArray = [];
  for (let i = startIndex; i <= endIndex; i++) {
    filteredArray.push(array[i]);
  }
  return filteredArray;
};
