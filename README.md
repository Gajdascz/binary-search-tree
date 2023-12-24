# binary-search-tree

This repository, part of The Odin Project's Node.js curriculum, showcases my implementations of a binary search tree, queue, and stack data structure in JavaScript.
<br/>Project Page: [The Odin Project](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

## Learning Outcomes

Working through this project provided me with an invaluable learning experience, deepening my understanding in several key areas of data structures and algorithms using JavaScript:

- **Node-based Data Structures:** Gained practical skills in creating and managing nodes within different data structures.
- **Binary Search Trees:** Experience implementing a bst from scratch including a large variety of functions to query, search, manipulate, maintain, and traverse its nodes.
- **Traversal Algorithms:** Developed a comprehensive understanding of common tree traversal functions in both recursive and iterative form. This allowed me to compare these both approaches and understand their use cases and limitations.
- **Queues and Stacks:** Practical experience creating a queue and stack data structure using linked nodes, reinforcing FIFO and LIFO principles in data processing and tree traversal.

## Reflection

This project on binary search trees was an engaging and rewarding experience, aligning closely with my interest in mathematics, programming, and algorithmic thinking. The challenge of solving complex problems in data structures and algorithms has been particularly enjoyable.

Understanding the intricacies of recursive processes, especially in various tree traversals, was both challenging and insightful. Implementing iterative post-order traversal, with its complex conditions, significantly improved my grasp of stack-based algorithms and deepened my understanding of tree structures.

Overall, this project reinforced my passion for complex problem-solving and honed my skills in software development. I am excited to apply these learnings in future endeavors, exploring more advanced aspects of data structures and algorithms.

## tree.js

The `tree.js` module is an Object factory for a binary search tree. It features:

<details><summary>Returned Wrapper Functions</summary>

- `build()`: Builds bst and initializes root node.
- `print()`: Logs a readable bst to the console.
- `insert(value)`: Inserts node.
- `remove(value)`: Removes node.
- `rebalance()`: Rebalances unbalanced tree.
- `find(value)`: Finds and returns node.
- `depth(value)`: Returns depth of node (distance from root).
- `height(value)`: Returns height of node (distance from furthest leaf)
- `isBalanced()`: Returns true if tree is balanced.
- `get root()`: Accessor, returns root node.
- `get arr()`: Accessor, returns stored array.
- `set arr(newArr)`: Accessor, sets new array.
- Each traversal function is prefixed with either an i for iterative or r for recursive and executes the callback function fn on each node starting at startValue. - `i/rLevelOrder(fn, startValue)`: Top to Bottom, Left to Right. - `i/rPreOrder(fn, startValue)`: root,left,right. - `i/rInOrder(fn, startValue)`: left,root,right. - `i/rPostOrder(fn, startValue)`: left,right,root.
  </details>

<details><summary>Primary & Helper Functions</summary>
<details><summary>Primary</summary>

- `buildTree(arr,lhs,rhs)`: Recursively builds balanced bst from array of nodes.
- `prettyPrint(node,prefix,isLeft)`: Prints readable tree structure to console (courtesy of The Odin Project).
- `buildNodeArray(arr)`: Builds array of nodes from array of number values.
- `insertNode(node)`: Finds leaf and inserts node.
- `removeNode(node)`: Swaps input node with successor and removes input node as leaf.
- `findNode(value,currentNode,depth)`: Finds node from value and returns the node and depth.
- `heightOfNode(node)`: Returns height of node.
- `checkBalance(root)`: Checks if tree is balanced (no branch has a greater than 1 difference in height).
</details>
<details><summary>Traversal</summary>

- Each Primary Traversal Function is:

  - Prefixed With Iterative and/or Recursive Respectively.
  - Takes a callback function to be executed on each node and a node to start the traversal at.

    - `levelOrder(fn,start)`: Top-to-bottom, left-to-right order.
    - `preOrder(fn,start)`: root, left, right.
    - `inOrder(fn,start)`: As far-left as possible, root, then right. In a balanced tree, this should print the values in ascending order.
    - `postOrder(fn,start)`: left, right, root.
    </details>

  <details><summary>Helper</summary>

  - `getSpotForNode(value,currentNode)`: Returns leaf and direction a new node should be inserted at.
  - `getSuccessor(node)`: Returns the successor node used to swap and replace the old node.
  - `replaceChildNode(parent,oldNode,newNode,isRemoval)`: Using the parent node, replaces the old child with the new node.
  - `updateArrayAfterRemoval(removedNode)`: Updates stored node array after a node is removed.
  - `findParentNode(value,currentNode)`: Returns parent node of given value.

  </details>

  </details>

## treeNode.js

`treeNode.js` module is an Object factory for creating nodes used in a binary search tree. It includes:

- Data storage and methods: -`hasDataKey(key)`,`addData(key,value)`,`removeData(key)`,`getData()`
- Accessors: -`get left(), set left(leftNode)`, `get right()`, `set right(rightNode)`: Pointers to nodes in the tree.
  - `get allData()`: Returns entire stored data Object.
  - `get value()`, `set value(newValue)`: Node reference value.
  - `get count()`, `set count(newCount)`: Number of times the value reference was added to the tree.
  - `get isNode()`: Returns true if Object has this accessor method.

## queue.js

`queue.js` is an Object factory module for queue data structures featuring:

- `enqueue(data)`: Creates and pushes a node containing the input data to the back of the queue.
- `dequeue()`: Removes the first node of the queue and returns its data.
- `get size()`: Returns number of nodes in queue.
- `get peek()`: Returns the data in the first node of the queue.
- `get isEmpty()`: Returns true if the queue has no nodes.

## stack.js

`stack.js` is an Object factory module for stack data structures featuring:

- `push(data)`: Creates and pushes a node containing the input data to the top of the stack.
- `pop()`: Removes the top node and returns its data.
- `get size()`: Returns the number of nodes in the stack.
- `get top()`: Returns the data in the first node in the stack.
- `get isEmpty()`: Returns true if the stack has no nodes.

## mergeSort.js

Sorts input array to be processed by the binary search tree. O(nlogn)

## node.js

Basic node with a single pointer used for queue and stack data structures.

- `get data()`, `set data()`, `get next()`, `set next()`

## To Be Implemented

- **Graphical User Interface**
- **Traversal and Structure Visualization**
