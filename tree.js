import { node as treeNode } from "./node.js";
import { mergeSort } from "./mergeSort.js";
function tree(arr = []) {
  let _root = null;
  let _arr = buildNodeArray(arr);
  const build = () => (_root = buildTree(_arr, 0, _arr.length - 1));

  function buildNodeArray(arr) {
    const sortedArr = mergeSort(arr);
    let nodes = [];
    let count = 1;
    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i] === sortedArr[i + 1]) count++;
      else {
        const newNode = treeNode({ name: sortedArr[i], count });
        nodes.push(newNode);
        count = 1;
      }
    }
    return nodes;
  }

  const buildTree = (arr, lhs, rhs) => {
    if (lhs > rhs) return null;
    const midIndex = Math.floor((lhs + rhs) / 2);
    const root = arr[midIndex];
    root.left = buildTree(arr, lhs, midIndex - 1);
    root.right = buildTree(arr, midIndex + 1, rhs);
    return root;
  };

  return {
    get root() {
      return _root;
    },
    get arr() {
      return _arr;
    },
    set arr(newArr) {
      _arr = buildNodeArray(newArr);
    },
    build,
  };
}

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6345];

const testTree = tree(testArr);
console.log(testTree.build());
