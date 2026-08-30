# Fibonacci & Merge Sort

This project is part of my learning journey through Data Structures and Algorithms, completed as part of [The Odin Project](https://www.theodinproject.com/)'s Data Structures and Algorithms curriculum, specifically the Recursion section. It focuses on practicing recursion by implementing classic algorithms from scratch rather than relying on built-in JavaScript methods.

## Algorithms

### Fibonacci Sequence

The Fibonacci sequence is a sequence where each number is the sum of the two numbers preceding it:

```
0, 1, 1, 2, 3, 5, 8, 13, 21, ...
```

This project contains a recursive implementation for generating the first `n` numbers of the sequence.

```javascript
fibsRec(8);
// [0, 1, 1, 2, 3, 5, 8, 13]
```

### Merge Sort

Merge Sort is a divide-and-conquer sorting algorithm. The implementation works by:

1. Dividing the array into two halves.
2. Recursively sorting the left half.
3. Recursively sorting the right half.
4. Merging the two sorted halves.
5. Continuing until the entire array is sorted.

```javascript
mergeSortAlgorithm([5, 4, 3, 2, 1]);
// [1, 2, 3, 4, 5]
```

The implementation includes a separate `merge` helper function, which:

- Compares elements from the left and right sorted portions.
- Places them into a temporary array.
- Handles any remaining elements after one side is exhausted.
- Copies the merged result back into the original array.

## Complexity

| Algorithm             | Time Complexity | Space Complexity |
| ---------------------- | ---------------- | ------------------ |
| Fibonacci (recursive)  | `O(2^n)`         | `O(n)`             |
| Merge Sort             | `O(n log n)`     | `O(n)`             |

## Project Structure

```
Fibonacci & MergeSort/
├── fibonacci.js
├── mergeSort.js
└── README.md
```

- **fibonacci.js** — Contains the recursive Fibonacci sequence implementation.
- **mergeSort.js** — Contains the recursive Merge Sort implementation and the `merge` helper function.

## Concepts Practiced

- Recursion
- Base cases
- Recursive function calls
- Divide-and-conquer algorithms
- Array manipulation
- Sorting algorithms
- Time complexity
- Space complexity
- Breaking problems into smaller subproblems
- Implementing algorithms from scratch

## Learning Resource

This project is based on the Recursion section of [The Odin Project](https://www.theodinproject.com/).

---

Part of my journey to build a strong foundation in Data Structures and Algorithms.