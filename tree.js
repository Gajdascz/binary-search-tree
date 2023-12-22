import { node as treeNode } from "./nodes/treeNode.js";
import { mergeSort } from "./mergeSort.js";
import { queue } from "./queue.js";

function tree(arr = []) {
  let _root = null;
  let _arr = buildNodeArray(arr);

  // Returned wrapper functions
  const build = () => (_root = buildTree(_arr, 0, _arr.length - 1));
  const print = () => prettyPrint(_root);
  const insert = (value) => insertNode(value.isNode ? value : treeNode({ value }), _root);
  const find = (value) => findNode(value, _root);
  const remove = (value) => removeNode(value);

  // Primary Functions
  const buildTree = (arr, lhs, rhs) => {
    if (lhs > rhs) return null;
    const midIndex = Math.floor((lhs + rhs) / 2);
    const root = arr[midIndex];
    root.left = buildTree(arr, lhs, midIndex - 1);
    root.right = buildTree(arr, midIndex + 1, rhs);
    return root;
  };
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}${node.count > 1 ? "(" + node.count + ")" : ""}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  const insertNode = (node) => {
    const result = getSpotForNode(node.value);
    if (!result.direction) result.node.count += 1;
    else result.node[result.direction] = node;
  };
  const findNode = (value, currentNode) => {
    if (!currentNode || value === currentNode.value) return currentNode;
    else if (value < currentNode.value) return findNode(value, currentNode.left);
    else if (value > currentNode.value) return findNode(value, currentNode.right);
  };
  const removeNode = (value) => {
    let nodeToRemove = find(value);
    if (!nodeToRemove) return;
    let parent = findParentNode(nodeToRemove.value);
    if (!nodeToRemove.left && !nodeToRemove.right) return replaceChildNode(parent, nodeToRemove, null);
    else if (nodeToRemove.left && !nodeToRemove.right) return replaceChildNode(parent, nodeToRemove, nodeToRemove.left);
    else if (!nodeToRemove.left && nodeToRemove.right)
      return replaceChildNode(parent, nodeToRemove, nodeToRemove.right);
    else {
      let successor = getSuccessor(nodeToRemove);
      let successorParent = findParentNode(successor.value);
      nodeToRemove.value = successor.value;
      nodeToRemove.data = successor.data;
      nodeToRemove.count = successor.count;
      if (successor.right) replaceChildNode(successorParent, successor, successor.right);
      else successorParent.left = null;
    }
  };
  function buildNodeArray(arr) {
    const sortedArr = mergeSort(arr);
    let nodes = [];
    let count = 1;
    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i] === sortedArr[i + 1]) count++;
      else {
        const newNode = treeNode({ value: sortedArr[i], count });
        nodes.push(newNode);
        count = 1;
      }
    }
    return nodes;
  }

  // Primary Function Helpers
  const getSpotForNode = (value, currentNode = _root) => {
    if (value === currentNode.value) return { node: currentNode, direction: null };
    if (value < currentNode.value) {
      if (currentNode.left === null) {
        return { node: currentNode, direction: "left" };
      } else return getSpotForNode(value, currentNode.left);
    } else {
      if (currentNode.right === null) {
        return { node: currentNode, direction: "right" };
      } else return getSpotForNode(value, currentNode.right);
    }
  };
  const getSuccessor = (node) => {
    node = node.right;
    while (node && node.left) node = node.left;
    return node;
  };
  const replaceChildNode = (parent, oldNode, newNode) => {
    if (!parent) _root = newNode;
    else if (parent.left === oldNode) parent.left = newNode;
    else parent.right = newNode;
  };
  const findParentNode = (value, currentNode = _root) => {
    if (!currentNode || (!currentNode.left && !currentNode.right)) return null;
    if (
      (currentNode.left && value === currentNode.left.value) ||
      (currentNode.right && value === currentNode.right.value)
    )
      return currentNode;
    else if (currentNode.left && value < currentNode.value) return findParentNode(value, currentNode.left);
    else if (currentNode.right && value > currentNode.value) return findParentNode(value, currentNode.right);
  };

  // Traversal Functions
  const iterativeLevelOrder = (fn) => {};
  const recursiveLevelOrder = (fn) => {};
  const inOrder = (fn) => {};
  const preOrder = (fn) => {};
  const postOrder = (fn) => {};

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
    print,
    insert,
    find,
    remove,
  };
}

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6345, 100, 70];

const testTree = tree(testArr);
testTree.build();
testTree.insert(10);
testTree.print();
testTree.remove(9);
testTree.print();
