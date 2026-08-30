# Linked List

This project implements a singly linked list in JavaScript as part of Data Structures and Algorithms practice.

## Project Context

This project is part of my Data Structures and Algorithms practice while learning JavaScript. It implements a **Singly Linked List** using two main components:

1. `Node` class
2. `LinkedList` factory function

### Node

The `Node` class represents an individual node in the linked list. Each node contains:

- `data` — stores the value
- `next` — stores a reference to the next node

The `next` property is initialized to `null`.

```js
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
```

### LinkedList

The `LinkedList` is implemented as a **factory function** rather than a JavaScript class. It maintains:

- `headNode` — reference to the first node
- `listSize` — number of nodes currently in the list

Both are kept private inside the factory function using JavaScript closures. The factory returns the public methods used to interact with the list.

## Implemented Methods

### `append(value)`

Adds a new node containing `value` to the end of the linked list.

```text
Before:
( 10 ) -> ( 20 ) -> null

append(30)

After:
( 10 ) -> ( 20 ) -> ( 30 ) -> null
```

### `prepend(value)`

Adds a new node containing `value` to the beginning of the linked list.

```text
Before:
( 10 ) -> ( 20 ) -> null

prepend(5)

After:
( 5 ) -> ( 10 ) -> ( 20 ) -> null
```

### `size()`

Returns the total number of nodes in the linked list.

```js
list.size(); // 3
```

### `head()`

Returns the value stored in the first node. If the list is empty, it returns `undefined`.

```js
list.head(); // 10
```

### `tail()`

Returns the value stored in the final node. If the list is empty, it returns `undefined`.

```js
list.tail(); // 30
```

### `at(index)`

Returns the value stored at the specified zero-based index. If there is no node at the specified index, it returns `undefined`.

```js
list.at(0); // 10
list.at(2); // 30
list.at(5); // undefined
```

### `pop()`

**Important:** for this project, `pop()` removes the **head node**, not the tail node. It returns the value of the removed node. If the list is empty, it returns `undefined`.

This behavior follows the assignment specification, even though many linked-list implementations conventionally use `pop()` to remove the last node.

```text
Before:
( 10 ) -> ( 20 ) -> ( 30 ) -> null

pop()

Returns:
10

After:
( 20 ) -> ( 30 ) -> null
```

### `contains(value)`

Returns `true` if the specified value exists anywhere in the list, otherwise returns `false`.

```js
list.contains(20);  // true
list.contains(100); // false
```

### `findIndex(value)`

Returns the zero-based index of the first node containing the specified value. If the value does not exist, it returns `-1`. If duplicate values exist, it returns the index of the first occurrence.

```js
list.findIndex(20);  // 1
list.findIndex(100); // -1
```

For duplicates:

```text
( 10 ) -> ( 20 ) -> ( 30 ) -> ( 20 ) -> null

findIndex(20)

Returns:
1
```

### `toString()`

Converts the linked list into a readable string representation, in the format:

```text
( value ) -> ( value ) -> ( value ) -> null
```

For an empty list, the current implementation produces:

```text
null
```

## Example Usage

```js
const list = new LinkedList();

list.append(10);
list.append(20);
list.append(30);

list.prepend(5);

console.log(list.toString());
// ( 5 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> null

console.log(list.size());
// 4

console.log(list.head());
// 5

console.log(list.tail());
// 30

console.log(list.at(2));
// 20

console.log(list.contains(20));
// true

console.log(list.findIndex(20));
// 2

console.log(list.pop());
// 5

console.log(list.toString());
// ( 10 ) -> ( 20 ) -> ( 30 ) -> null
```

## Testing

This project uses a simple, plain JavaScript manual testing approach — no testing framework (such as Jest, Mocha, or Vitest) is used.

The test script performs operations and prints:

- Expected result
- Actual result

It tests:

- Empty list behavior
- `append()`
- `prepend()`
- `pop()`
- `head()`
- `tail()`
- `size()`
- `at()`
- `contains()`
- `findIndex()`
- `toString()`
- Duplicate values

Run the project from the terminal:

```bash
node linkedList.js
```

The printed output can then be manually compared against the expected values.

## Example Testing Output

```text
After append(10):
Expected: ( 10 ) -> null
Actual:   ( 10 ) -> null

After append(20):
Expected: ( 10 ) -> ( 20 ) -> null
Actual:   ( 10 ) -> ( 20 ) -> null

After prepend(5):
Expected: ( 5 ) -> ( 10 ) -> ( 20 ) -> null
Actual:   ( 5 ) -> ( 10 ) -> ( 20 ) -> null
```

## Data Structure Explanation

A singly linked list consists of nodes, where:

- Each node stores a value.
- Each node stores a reference to the next node.
- The final node points to `null`.
- The list keeps track of its first node through `headNode`.
- Nodes are connected through their `next` references.

```text
headNode
   |
   v
( 10 ) -> ( 20 ) -> ( 30 ) -> null
```

When a value is **appended**, a new node is added at the end and the previous last node's `next` is updated to point to it. When a value is **prepended**, a new node is created, its `next` points to the current `headNode`, and it becomes the new `headNode`.

## Implementation Approach

### Closures

`headNode` and `listSize` are declared inside the `LinkedList()` factory function and are therefore not directly accessible from outside. The returned methods retain access to them through JavaScript closures.

```js
function LinkedList() {
    let headNode = null;
    let listSize = 0;

    // methods can access headNode and listSize

    return {
        append,
        prepend,
        size,
        head,
        tail,
        at,
        pop,
        contains,
        findIndex,
        toString
    };
}
```

### Traversal

Many operations traverse the linked list by starting at `headNode` and repeatedly following:

```js
temp = temp.next;
```

This traversal pattern is used by methods such as `append()`, `tail()`, `at()`, `contains()`, `findIndex()`, and `toString()`.

## Complexity

| Operation     | Time Complexity |
| ------------- | ---------------- |
| `append()`    | `O(n)`           |
| `prepend()`   | `O(1)`           |
| `size()`      | `O(1)`           |
| `head()`      | `O(1)`           |
| `tail()`      | `O(n)`           |
| `at(index)`   | `O(n)`           |
| `pop()`       | `O(1)`           |
| `contains()`  | `O(n)`           |
| `findIndex()` | `O(n)`           |
| `toString()`  | `O(n)`           |

`append()` is `O(n)` in this implementation because there is no tail pointer, so the list must be traversed from the head to the final node. `pop()` is `O(1)` here because it removes the head node directly.

## Edge Cases

The implementation handles the following edge cases:

- Calling `head()` on an empty list — returns `undefined`
- Calling `tail()` on an empty list — returns `undefined`
- Calling `pop()` on an empty list — returns `undefined`
- Calling `at()` with an index outside the list — returns `undefined`
- Searching for a value that does not exist — `contains()` returns `false`, `findIndex()` returns `-1`
- Searching when duplicate values exist — `findIndex()` returns the index of the first occurrence
- Appending to an empty list — the new node becomes both the head and the tail
- Prepending to an empty list — the new node becomes both the head and the tail

## Learning Objectives

This project helps practice:

- Understanding linked lists
- Understanding nodes and references
- Working with pointers/references in JavaScript
- Traversing a linked list
- Implementing data structure operations
- Understanding closures
- Practicing Big-O analysis
- Writing simple manual tests

## Possible Future Improvements

These are potential improvements, not features currently implemented:

- Add a `tailNode` reference to make `append()` O(1)
- Add an operation to remove the tail
- Add an operation to insert at a specific index
- Add an operation to remove a specific value
- Add an iterator
- Add automated tests later

## Project Structure

```text
LinkedList/
├── linkedList.js
└── README.md
```