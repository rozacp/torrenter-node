/*
  Helpers
*/

// filter for unique
export const getUnique = (arr, key) => arr.map((e) => e[key])
  .map((e, i, final) => final.indexOf(e) === i && i)
  .filter((e) => arr[e])
  .map((e) => arr[e]);

// capitalise each letter in sentence
export const capitalize = (str) => {
  if (typeof str !== 'string') {
    return false;
  }

  return str.toLowerCase()
    .trim()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};
