export const createUrlSuffixArray = (array, startIndex, endIndex) => {
  const urlSuffixArray = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const element = array[i].url.replace('https://unsplash.com/photos/', '');
    urlSuffixArray.push(element);
  }

  return urlSuffixArray;
};
