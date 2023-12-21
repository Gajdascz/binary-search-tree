const split = (arr) => {
  const lhs = arr.slice(0, Math.floor(arr.length / 2));
  const rhs = arr.slice(lhs.length, arr.length);
  return { lhs, rhs };
};

const merge = (lhs, rhs) => {
  let arr = [];
  let i = 0;
  let j = 0;
  while (i < lhs.length && j < rhs.length) {
    if (lhs[i] > rhs[j]) {
      arr.push(rhs[j]);
      j++;
    } else if (lhs[i] < rhs[j]) {
      arr.push(lhs[i]);
      i++;
    } else if (lhs[i] === rhs[j]) {
      arr.push(lhs[i], rhs[j]);
      i++;
      j++;
    }
  }
  if (lhs.length === i && rhs.length !== j) arr.push(...rhs.slice(j, rhs.length));
  if (rhs.length === j && lhs.length !== i) arr.push(...lhs.slice(i, lhs.length));
  return arr;
};

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const splitArr = split(arr);
  const lhs = mergeSort(splitArr.lhs);
  const rhs = mergeSort(splitArr.rhs);
  return merge(lhs, rhs);
}

export { mergeSort };
