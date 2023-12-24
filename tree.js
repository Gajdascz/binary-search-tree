import { node as treeNode } from "./nodes/treeNode.js";
import { mergeSort } from "./mergeSort.js";
import { queue } from "./queue.js";
import { stack } from "./stack.js";

function tree(arr = []) {
  // Tree Properties
  let _root = null;
  let _arr = buildNodeArray(arr);

  /** Returned Wrapper Functions
   * All functions that take an argument expect an integer value and will
   * convert the value to a node if necessary.
   */
  // Tree Construction and Basic Operations
  const build = () => (_root = buildTree(_arr, 0, _arr.length - 1));
  const print = () => prettyPrint(_root);

  // Node Manipulation
  const insert = (value) => insertNode(value.isNode ? value : treeNode({ value }), _root);
  const remove = (value) => removeNode(value);
  const rebalance = () => {
    if (!isBalanced()) {
      const arr = [];
      iInOrder((node) => arr.push(node));
      _arr = arr;
      build();
    }
  };

  // Search and Query
  /* Returns:
   * - find -> node
   * - depth -> integer
   * - isBalanced -> boolean
   */
  const find = (value) => findNode(value)?.node ?? null;
  const depth = (value) => {
    const testValue = value ?? _root.value;
    const result = findNode(testValue);
    return result.node ? result.depth : null;
  };
  const height = (value) => {
    const testValue = value ?? _root;
    const node = findNode(testValue)?.node;
    return node ? heightOfNode(node) : null;
  };
  const isBalanced = () => checkBalance(_root);

  /* Tree Traversal
   *  - All functions are preceded with an i for iterative or r for recursive.
   *  - All functions accept a callback function which is executed on each node and
   *    a node value to start the traversal at (defaults to root).
   */
  const rLevelOrder = (fn, startValue) => recursiveLevelOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);
  const iLevelOrder = (fn, startValue) => iterativeLevelOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);

  const rPreOrder = (fn, startValue) => recursivePreOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);
  const iPreOrder = (fn, startValue) => iterativePreOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);

  const rInOrder = (fn, startValue) => recursiveInOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);
  const iInOrder = (fn, startValue) => iterativeInOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);

  const rPostOrder = (fn, startValue) => recursivePostOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);
  const iPostOrder = (fn, startValue) => iterativePostOrder(fn ? fn : void 0, startValue ? find(startValue) : _root);

  // Primary Functions
  // Tree Construction and Basic Operations
  /* Builds Tree From Sorted Array of Nodes
   */
  const buildTree = (arr, lhs, rhs) => {
    if (lhs > rhs) return null;
    const midIndex = Math.floor((lhs + rhs) / 2);
    const root = arr[midIndex];
    root.left = buildTree(arr, lhs, midIndex - 1);
    root.right = buildTree(arr, midIndex + 1, rhs);
    return root;
  };
  /* Prints Readable Tree to Console
   */
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
  /* Converts unsorted array of integers to sorted array of nodes
   *  Duplicates are removed and accounted for in the respective node's
   *  count variable property.
   */
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

  // Node Manipulation
  /* Inserts Node In Tree at Correct Leaf
   */
  const insertNode = (node) => {
    const result = getSpotForNode(node.value);
    if (!result.direction) result.node.count += 1;
    else result.node[result.direction] = node;
  };
  /* Removes Node From Tree
   *  Finds the successor of the node to be removed
   *  and swaps their value and data then removes
   *  the node as a leaf.
   */
  const removeNode = (value) => {
    let nodeToRemove = find(value);
    if (!nodeToRemove) return;
    let parent = findParentNode(nodeToRemove.value);
    if (!nodeToRemove.left && !nodeToRemove.right) return replaceChildNode(parent, nodeToRemove, null, true);
    else if (nodeToRemove.left && !nodeToRemove.right)
      return replaceChildNode(parent, nodeToRemove, nodeToRemove.left, true);
    else if (!nodeToRemove.left && nodeToRemove.right)
      return replaceChildNode(parent, nodeToRemove, nodeToRemove.right, true);
    else {
      let successor = getSuccessor(nodeToRemove);
      let successorParent = findParentNode(successor.value);
      nodeToRemove.value = successor.value;
      nodeToRemove.data = successor.data;
      nodeToRemove.count = successor.count;
      if (successor.right) replaceChildNode(successorParent, successor, successor.right, true);
      else replaceChildNode(successorParent, successor, null, true);
    }
  };

  // Search and Query
  /* Returns Object Containing Node and Node depth
   *  Depth being the number of edges from a node to the root.
   */
  const findNode = (value, currentNode = _root, depth = 0) => {
    if (!currentNode || value === currentNode.value) return { node: currentNode, depth };
    else if (value < currentNode.value) return findNode(value, currentNode.left, (depth += 1));
    else if (value > currentNode.value) return findNode(value, currentNode.right, (depth += 1));
  };
  /* Returns the Node Height
   *  Height being the highest number of edges from a node
   *  to a leaf.
   */
  const heightOfNode = (node) => {
    if (node === null) return null;
    else {
      let leftHeight = heightOfNode(node.left);
      let rightHeight = heightOfNode(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  };
  /* Returns True if balanced, False otherwise.
   */
  const checkBalance = (root) => {
    if (root === null) return true;
    else {
      let leftSubtree = heightOfNode(root.left);
      let rightSubtree = heightOfNode(root.right);
      if (Math.abs(leftSubtree - rightSubtree) > 1) return false;
      else return checkBalance(root.left) && checkBalance(root.right);
    }
  };

  // Traversal Functions
  /* Level Order Uses Breadth-First Search to Traverses The Tree Level by Level,
   * Left to Right From Input Node to The Lowest Leaf.
   *
   * Iterative Implementation Uses Queue Data Structure `queue.js` With Linked Nodes
   */
  const iterativeLevelOrder = (fn, start) => {
    const q = queue();
    if (start) q.enqueue(start);
    while (!q.isEmpty) {
      let currentNode = q.dequeue();
      fn(currentNode);
      if (currentNode.left) q.enqueue(currentNode.left);
      if (currentNode.right) q.enqueue(currentNode.right);
    }
  };
  const recursiveLevelOrder = (fn, start) => {
    const processLevel = (node, level) => {
      if (node === null) return;
      if (level === 1) fn(node);
      else {
        processLevel(node.left, level - 1);
        processLevel(node.right, level - 1);
      }
    };
    for (let level = 1; level <= height(start.value) + 1; level++) {
      processLevel(start, level);
    }
  };
  /* Pre, In, and Post Order Use Depth-First Search to Traverse The Tree.
   *  - Iterative Implementations Use Stack Data Structure `stack.js` With Linked Nodes.
   *  - Order Traverse Patterns:
   *    - preOrder <root>,<left>,<right>
   *    - inOrder <left>,<root>,<right>
   *    - postOrder <left>,<right>,<root>
   */
  const recursivePreOrder = (fn, node) => {
    const traverse = (node) => {
      if (node === null) return;
      else {
        fn(node);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(node);
  };
  const iterativePreOrder = (fn, start) => {
    const s = stack();
    s.push(start);
    while (!s.isEmpty) {
      let node = s.pop();
      fn(node);
      if (node.right) s.push(node.right);
      if (node.left) s.push(node.left);
    }
  };
  const recursiveInOrder = (fn, start) => {
    const traverse = (node) => {
      if (node === null) return;
      else {
        traverse(node.left);
        fn(node);
        traverse(node.right);
      }
    };
    traverse(start);
  };
  const iterativeInOrder = (fn, start) => {
    const s = stack();
    const pushAllLeft = (node) => {
      while (node) {
        s.push(node);
        node = node.left;
      }
    };
    pushAllLeft(start);
    while (!s.isEmpty) {
      let node = s.pop();
      fn(node);
      if (node.right) pushAllLeft(node.right);
    }
  };
  const recursivePostOrder = (fn, start) => {
    const traverse = (node) => {
      if (node === null) return;
      else {
        traverse(node.left);
        traverse(node.right);
        fn(node);
      }
    };
    traverse(start);
  };
  const iterativePostOrder = (fn, start) => {
    const s = stack();
    let lastVisited = null;
    s.push(start);
    while (!s.isEmpty) {
      let current = s.top;
      if (current.left && current.left !== lastVisited && current.right !== lastVisited) s.push(current.left);
      else if (current.right && current.right !== lastVisited) s.push(current.right);
      else {
        fn(current);
        lastVisited = current;
        s.pop();
      }
    }
  };

  // Primary Function Helpers
  /* Called by insertNode()
   *  Traverses tree and returns the leaf node and direction (as Object)
   *   that new node should be inserted.
   */
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
  /* Called by removeNode()
   *  Returns the successor node that will be
   *  use to swap and replace the old node.
   */
  const getSuccessor = (node) => {
    node = node.right;
    while (node && node.left) node = node.left;
    return node;
  };
  /* Called by removeNode()
   *  Using the parent node, replaces the correct
   *  old child node with the new node.
   */
  const replaceChildNode = (parent, oldNode, newNode, isRemoval = false) => {
    if (!parent) _root = newNode;
    else if (parent.left === oldNode) parent.left = newNode;
    else parent.right = newNode;
    if (isRemoval) updateArrayAfterRemoval(oldNode);
  };
  const updateArrayAfterRemoval = (removedNode) => {
    const index = _arr.findIndex((node) => node.value === removedNode.value);
    if (index !== -1) _arr.splice(index, 1);
  };
  /* Called by removeNode()
   *  Finds and returns the parent node of given value.
   */
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

  // Ensures stored array is of nodes, not just values.
  if (_arr.length > 0 && _root === null) build();

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
    height,
    depth,
    isBalanced,
    iLevelOrder,
    rLevelOrder,
    rPreOrder,
    rInOrder,
    rPostOrder,
    iPreOrder,
    iInOrder,
    iPostOrder,
    rebalance,
  };
}

export { tree };
