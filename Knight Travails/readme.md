# Knights Travails

A JavaScript implementation of the **Knight's Travails** problem using **Breadth-First Search (BFS)** to find the shortest path between two squares on a standard 8×8 chessboard.

This project is part of my journey to strengthen my understanding of **Data Structures and Algorithms**, particularly graph traversal and shortest-path algorithms.

## Problem

A knight on a chessboard can move in an **L-shape**:

* 2 squares horizontally and 1 vertically
* 2 squares vertically and 1 horizontally

The goal is to find the **shortest possible sequence of moves** required to travel from one square to another.

For example:

```js
knightMoves([0, 0], [1, 2]);
```

returns:

```js
[
    [0, 0],
    [1, 2]
]
```

Another example:

```js
knightMoves([0, 0], [3, 3]);
```

could return:

```js
[
    [0, 0],
    [2, 1],
    [3, 3]
]
```

There can be multiple shortest paths, so any valid shortest path is acceptable.

## Approach

The chessboard is treated as an **implicit graph**:

* Each square is a **vertex/node**
* Each valid knight move is an **edge**
* The board itself does not need to be explicitly constructed

### Breadth-First Search

BFS is used because it explores nodes level by level.

```text
Start
  ↓
1 move away
  ↓
2 moves away
  ↓
3 moves away
  ↓
Target
```

Therefore, the first time the target is reached, the path found is guaranteed to be a **shortest path**.

## Implementation

The implementation consists of several key components.

### Valid Knight Moves

The eight possible knight movements are represented as coordinate offsets:

```js
[
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1]
]
```

Invalid moves that fall outside the 8×8 board are discarded.

### Visited Board

A 2D array keeps track of which squares have already been visited:

```js
visited[x][y]
```

This prevents BFS from repeatedly exploring the same square.

### Queue

BFS uses a queue to process positions in **First-In, First-Out (FIFO)** order:

```js
queue.push(node);
const node = queue.shift();
```

### Parent Tracking

A HashMap stores where each discovered square came from:

```text
child → parent
```

For example:

```text
[2,1] → [0,0]
[4,2] → [2,1]
[6,3] → [4,2]
```

This allows the path to be reconstructed after reaching the target.

### Path Reconstruction

Once the target is found, the algorithm walks backwards through the parent relationships:

```text
target
  ↓
parent
  ↓
parent
  ↓
start
```

The resulting path is then reversed to produce:

```text
start → ... → target
```

## Usage

```js
import knightMoves from "./knightMoves.js";

const path = knightMoves([0, 0], [7, 7]);

console.log(path);
```

Example output:

```text
You made it in 6 moves! Here's your path:
[0,0]
[2,1]
[4,2]
[6,3]
[7,5]
[5,6]
[7,7]
```

The exact shortest path may differ because multiple shortest paths can exist.

## Complexity

The board contains only **64 squares**, so the search space is very small.

For a general graph:

* **Time:** `O(V + E)`
* **Space:** `O(V)`

For this particular problem, `V = 64`, so the algorithm is effectively constant-sized in practice.

## Tests

The project includes Jest tests covering cases such as:

* A single knight move
* Multiple-move paths
* Paths between distant squares
* Starting and ending on the same square
* Verification of shortest-path length

Run the tests with:

```bash
npm test
```

## What I Learned

This project helped reinforce:

* Graph representation
* Implicit graphs
* Breadth-First Search
* Queue-based traversal
* Visited-node tracking
* Shortest-path algorithms
* Parent/predecessor tracking
* Path reconstruction
* Working with 2D coordinates in JavaScript

## Credits

This project is based on **The Odin Project – Knights Travails** assignment and is part of my Data Structures and Algorithms learning journey.
