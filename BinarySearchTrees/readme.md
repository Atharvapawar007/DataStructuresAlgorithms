# Binary Search Tree

A Binary Search Tree (BST) implementation in JavaScript built as part of my journey to strengthen **Data Structures and Algorithms fundamentals**.

This project is based on **The Odin Project's Binary Search Trees assignment**.

## Overview

A Binary Search Tree is a binary tree where:

* Every value in the left subtree is **less than** the current node.
* Every value in the right subtree is **greater than** the current node.
* Each node can have at most two children.

The tree in this project is initially constructed as a **balanced BST** from an input array.

## Features

The implementation supports:

* Creating a balanced BST from an array
* Removing duplicate values
* Searching for values
* Inserting new values
* Deleting values
* Level-order traversal
* In-order traversal
* Pre-order traversal
* Post-order traversal
* Finding the height of a node
* Finding the depth of a node
* Checking whether the tree is balanced
* Rebalancing an unbalanced tree
* Pretty-printing the tree

## Implementation

### Node

Each `Node` contains:

```javascript
{
    data,
    left,
    right
}
```

Where `left` and `right` reference the node's children.

### Tree

The `Tree` factory accepts an array and builds a balanced BST from it.

```javascript
const tree = new Tree([10, 5, 15, 3, 7]);
```

The input array is:

1. Deduplicated
2. Sorted
3. Recursively converted into a balanced BST

## Tree Operations

### `includes(value)`

Searches the BST for a given value.

Returns:

```text
true
```

if the value exists and:

```text
false
```

otherwise.

### `insert(value)`

Adds a value while preserving the BST property.

Duplicate values are ignored.

### `deleteItem(value)`

Removes a value from the tree.

The implementation handles:

* Leaf nodes
* Nodes with one child
* Nodes with two children
* Root deletion
* Deleting the only node
* Values that don't exist

### Traversals

The tree supports four traversal methods:

```javascript
tree.levelOrderForEach(callback);
tree.inOrderForEach(callback);
tree.preOrderForEach(callback);
tree.postOrderForEach(callback);
```

Each traversal passes the **node's value** to the callback.

#### Level Order

Visits nodes level by level using breadth-first traversal.

```text
       4
      / \
     2   6
    / \ / \
   1  3 5  7

4 → 2 → 6 → 1 → 3 → 5 → 7
```

#### In-Order

Visits:

```text
Left → Root → Right
```

For a BST, this produces values in sorted order.

#### Pre-Order

Visits:

```text
Root → Left → Right
```

#### Post-Order

Visits:

```text
Left → Right → Root
```

All traversal methods throw an error when no callback function is provided.

## Height

```javascript
tree.height(value);
```

Returns the height of the node containing the specified value.

Height is defined as the number of edges in the longest path from the node to a leaf.

For example:

```text
      10
     /
    5
   /
  3
```

```text
height(3) = 0
height(5) = 1
height(10) = 2
```

Returns `undefined` if the value does not exist.

## Depth

```javascript
tree.depth(value);
```

Returns the number of edges between the specified node and the root.

For example:

```text
      10
     /
    5
   /
  3
```

```text
depth(10) = 0
depth(5)  = 1
depth(3)  = 2
```

Returns `undefined` if the value does not exist.

## Balance

### `isBalanced()`

Checks whether the entire tree is balanced.

A tree is considered balanced when, for **every node**, the difference between the heights of its left and right subtrees is no greater than `1`.

```javascript
tree.isBalanced();
```

Returns:

```text
true
```

or:

```text
false
```

### `rebalance()`

Rebuilds an unbalanced tree into a balanced BST.

The existing tree is traversed in-order to obtain the sorted values, which are then passed through the tree-building process again.

```javascript
tree.rebalance();
```

## Visualizing the Tree

The implementation includes a `prettyPrint()` helper for displaying the tree structure in the console.

Example:

```text
│       ┌── 15
│   ┌── 10
└── 7
    │   ┌── 5
    └── 3
```

## Testing

The project uses **Jest** for automated testing.

The test suite covers:

* Tree construction
* Duplicate removal
* Searching
* Insertion
* Deletion
* All four traversals
* Height
* Depth
* Balance checking
* Rebalancing
* Edge cases

Run the tests with:

```bash
npm test binarySearchTree.
```

Current test status:

```text
Test Suites: 1 passed
Tests:       40 passed
```

## Project Structure

```text
BinarySearchTrees/
├── binarySearchTree.js
└── binarySearchTree.test.js
```

## Learning Goals

This project was built to practice:

* Binary Search Trees
* Recursion
* Tree traversal
* Breadth-first search
* Depth-first search
* Binary tree properties
* Recursive tree construction
* Searching
* Insertion and deletion
* Tree balancing
* Time and space complexity
* Writing automated tests with Jest

## References

* The Odin Project — Binary Search Trees
* GeeksforGeeks — Binary Search Tree insertion and deletion
* MyCodeSchool — Binary Tree Traversal
* Big-O Cheat Sheet
