import { tree } from "./tree.js";

const decimalPlace = [10, 100, 1000];
const getRandomNumber = () => Math.ceil(Math.random() * decimalPlace[Math.floor(decimalPlace.length * Math.random())]);
const arr = [0, 50, 32, 100, 1000];

// Utility Functions
const print = (str) => console.log(str + "\n");
const addToArray = (arr, n) => {
  for (let i = 0; i < n; i++) arr.push(getRandomNumber());
};
const insertNodes = (n) => {
  for (let i = 0; i < n; i++) bst.insert(getRandomNumber());
};

// Initialize BST With Array and 25 Random Values
addToArray(arr, 25);
const bst = tree(arr);

// Test Functions
function testBalanceAndTraversals() {
  print(`Initial Tree - isBalanced: ${bst.isBalanced()}`);
  bst.print();
  printTraversals();

  print(`-------------------Inserting ~150 Nodes---------------------`);
  insertNodes(150);
  print(`Unbalanced Tree - isBalanced: ${bst.isBalanced()}`);
  bst.print();
  printTraversals();

  print(`-------------------Rebalancing---------------------`);
  bst.rebalance();
  print(`Rebalanced Tree - isBalanced: ${bst.isBalanced()}`);
  bst.print();
  printTraversals();
}

function printTraversals() {
  const rResults = [];
  const iResults = [];
  const rCb = (node) => rResults.push(node.value);
  const iCb = (node) => iResults.push(node.value);

  const testAndReset = (i, r) => {
    print(`Iterative = Recursive: ` + (i.toString() === r.toString()));
    print(`----------------------------------------------------------------`);
    rResults.length = 0;
    iResults.length = 0;
  };
  print(`|  Traversals: (i = iterative, r = recursive)  |`);
  ["LevelOrder", "PreOrder", "PostOrder", "InOrder"].forEach((order) => {
    bst["i" + order](iCb);
    print(`i${order}: ${iResults.join(", ")}`);
    bst["r" + order](rCb);
    print(`r${order}: ${rResults.join(", ")}`);
    testAndReset(iResults, rResults);
  });
}

function testMethods() {
  console.log(`-------------------Find---------------------`);
  const testFind = (value) => {
    const result = bst.find(value);
    console.log(`find(${value}): ${result ? result.value : "Not Found"}`);
  };
  const testFindValues = [
    0,
    32,
    50,
    100,
    1000,
    bst.arr[20]?.value,
    bst.arr[50]?.value,
    bst.arr[32]?.value,
    bst.arr[44]?.value,
    bst.arr[53]?.value,
    bst.arr[66]?.value,
    -1,
    "!@#",
    1000000,
    bst.arr[900]?.value,
    bst.arr[-1]?.value,
  ];
  testFindValues.forEach((value) => testFind(value));

  console.log("\n" + `-------------------Remove---------------------`);
  const testRemove = (value) => {
    console.log(`Removing: remove(${value})`);
    bst.remove(value);
    const result = bst.find(value);
    console.log(
      `Is Node In Tree (find${value})? : ${result ? "Remove Failed. Node Found" : "Remove Successful. Node Not Found"}`
    );
  };

  const testRemoveValues = [0, 100, 1000, bst.arr[44]?.value, bst.arr[20]?.value, -1, 1000000];
  testRemoveValues.forEach((value) => testRemove(value));

  console.log(`-------------------Height and Depth---------------------`);
  const testHeightDepth = (value) => {
    const height = bst.height(value) ?? "Node Not Found";
    const depth = bst.depth(value) ?? "Node Not Found";
    console.log(`Height: ${value} = ${height}`);
    console.log(`Depth: ${value} = ${depth}`);
  };

  const testHeighDepthValues = [
    bst.root.value,
    bst.arr[20]?.value,
    bst.arr[44]?.value,
    bst.arr[50]?.value,
    bst.arr[66]?.value,
    -1,
    1000000,
  ];
  testHeighDepthValues.forEach((value) => testHeightDepth(value));
}

function testInsertDuplicates() {
  console.log("-------------------Insert Duplicate Values---------------------");
  const duplicateValue = 50;
  bst.insert(duplicateValue);
  bst.insert(duplicateValue);
  console.log(`Inserted duplicate value (${duplicateValue}) twice`);
  bst.print(); // Inserted Node Should Have a Count of (2). Unless the value Already Exists, then it should be (prevCount + 2).
}

function testRemoveRoot() {
  console.log("-------------------Remove Root Node---------------------");
  const rootValue = bst.root.value;
  bst.remove(rootValue);
  console.log(`Removed root node (${rootValue})`);
  bst.print(); // The new tree structure should be printed without the old root
}

testBalanceAndTraversals();
testMethods();
testInsertDuplicates();
testRemoveRoot();
