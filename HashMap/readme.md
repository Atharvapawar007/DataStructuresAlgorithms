# HashMap

A JavaScript implementation of a **HashMap data structure** built from scratch using a custom **Linked List** to handle hash collisions.

This project was created as part of the **The Odin Project – JavaScript curriculum** to understand how hash maps work internally rather than relying on JavaScript's built-in `Map` object.

---

## 📌 Features

This HashMap implementation supports:

* String keys with associated values
* Hashing using a polynomial hash function
* Collision handling using separate chaining
* Automatic resizing
* Configurable load factor
* Key-value insertion and updating
* Key lookup
* Key existence checking
* Key removal
* Retrieving all keys
* Retrieving all values
* Retrieving all key-value pairs
* Clearing the entire HashMap
* HashMap length tracking
* Jest test suite

---

## 🧠 How a HashMap Works

A HashMap stores data as **key-value pairs**:

```text
key       value
----------------
apple  →  red
banana →  yellow
dog    →  brown
```

Instead of searching through every key, the HashMap uses a **hash function** to convert a key into a number.

That number is then converted into a valid bucket index:

```text
key
 ↓
hash()
 ↓
hash code
 ↓
hash code % capacity
 ↓
bucket index
```

For example:

```text
"apple"
   ↓
hash("apple")
   ↓
some large number
   ↓
% 16
   ↓
bucket 5
```

The key-value pair is then stored inside that bucket.

---

## 🪣 Bucket Structure

The HashMap uses an array of buckets.

Each bucket contains a **Linked List**.

This is important because two different keys can produce the same bucket index.

For example:

```text
HashMap

Bucket 0 → empty
Bucket 1 → empty
Bucket 2 → (apple, red) → (banana, yellow) → null
Bucket 3 → empty
Bucket 4 → (dog, brown) → null
...
```

The linked list allows multiple key-value pairs to occupy the same bucket.

This technique is called **separate chaining**.

---

## 💥 Collision Handling

A collision occurs when two different keys map to the same bucket.

For example:

```text
hash("Rama") % 16 → 3
hash("Sita") % 16 → 3
```

Both keys need to be stored at bucket `3`.

The HashMap therefore stores them in the same linked list:

```text
Bucket 3

(Rama, value)
      ↓
(Sita, value)
      ↓
    null
```

When retrieving a value, the HashMap:

1. Hashes the key.
2. Finds the bucket.
3. Searches the linked list.
4. Compares the stored keys.
5. Returns the matching value.

---

## 🔑 Hash Function

The HashMap uses a polynomial-style hash function.

```javascript
function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
        hashCode =
            primeNumber * hashCode +
            key.charCodeAt(i);
    }

    return hashCode;
}
```

The resulting hash code is converted into a bucket index using:

```javascript
hash(key) % capacity
```

The current implementation accepts **string keys**.

---

## 📈 Capacity and Load Factor

The HashMap starts with:

```text
Capacity   = 16
Load factor = 0.75
```

The load factor determines when the HashMap should grow.

The resize threshold is:

```text
capacity × load factor
```

With the initial configuration:

```text
16 × 0.75 = 12
```

When the HashMap reaches its resizing threshold, its capacity is doubled:

```text
16 → 32
32 → 64
64 → 128
...
```

After resizing, the existing entries are redistributed among the new buckets.

---

## 🔄 Resizing

When the HashMap grows, simply increasing the capacity isn't enough.

The bucket index depends on the capacity:

```text
hash(key) % capacity
```

Therefore:

```text
hash(key) % 16
```

can produce a completely different result from:

```text
hash(key) % 32
```

The HashMap therefore:

```text
1. Collects existing entries
        ↓
2. Clears the existing buckets
        ↓
3. Doubles the capacity
        ↓
4. Re-inserts the entries
        ↓
5. Entries are placed into their new buckets
```

This process is handled by the `redistribute()` function.

---

# 🛠️ API

## `set(key, value)`

Adds a key-value pair to the HashMap.

If the key already exists, its value is updated rather than creating another entry.

```javascript
map.set("apple", "red");

map.set("apple", "green");
```

The second operation changes:

```text
apple → red
```

into:

```text
apple → green
```

It does not create a duplicate key.

---

## `get(key)`

Returns the value associated with a key.

```javascript
map.set("apple", "red");

map.get("apple");
```

Returns:

```text
red
```

If the key does not exist:

```javascript
map.get("banana");
```

returns:

```text
null
```

---

## `has(key)`

Checks whether a key exists.

```javascript
map.has("apple");
```

Returns:

```text
true
```

For a missing key:

```javascript
map.has("banana");
```

Returns:

```text
false
```

---

## `remove(key)`

Removes a key-value pair.

```javascript
map.remove("apple");
```

Returns:

```text
true
```

if the key existed and was removed.

If the key doesn't exist:

```javascript
map.remove("banana");
```

returns:

```text
false
```

---

## `length()`

Returns the number of stored key-value pairs.

```javascript
map.length();
```

Example:

```text
apple  → red
banana → yellow
dog    → brown
```

returns:

```text
3
```

---

## `clear()`

Removes all entries from the HashMap.

```javascript
map.clear();
```

After clearing:

```javascript
map.length(); // 0
map.keys();   // []
map.values(); // []
```

---

## `keys()`

Returns an array containing all stored keys.

```javascript
map.keys();
```

Example:

```javascript
[
    "apple",
    "banana",
    "dog"
]
```

The order is **not guaranteed**.

---

## `values()`

Returns an array containing all stored values.

```javascript
map.values();
```

Example:

```javascript
[
    "red",
    "yellow",
    "brown"
]
```

The order is **not guaranteed**.

---

## `entries()`

Returns an array containing all key-value pairs.

```javascript
map.entries();
```

Example:

```javascript
[
    ["apple", "red"],
    ["banana", "yellow"],
    ["dog", "brown"]
]
```

The order is **not guaranteed**.

---

## `getCapacity()`

Returns the HashMap's current bucket capacity.

```javascript
map.getCapacity();
```

Initially:

```text
16
```

After resizing:

```text
32
```

---

## `getLoadFactor()`

Returns the HashMap's configured load factor.

```javascript
map.getLoadFactor();
```

Returns:

```text
0.75
```

---

# 📊 Time Complexity

The HashMap uses separate chaining with linked lists.

| Operation   | Average | Worst Case |
| ----------- | ------: | ---------: |
| `hash()`    |    O(k) |       O(k) |
| `set()`     |    O(1) |       O(n) |
| `get()`     |    O(1) |       O(1) |
| `has()`     |    O(1) |       O(n) |
| `remove()`  |    O(1) |       O(n) |
| `length()`  |    O(1) |       O(n) |
| `clear()`   |    O(n) |       O(n) |
| `keys()`    |    O(n) |       O(n) |
| `values()`  |    O(n) |       O(n) |
| `entries()` |    O(n) |       O(n) |

Where:

* `n` = number of stored entries
* `k` = length of the string key

The average-case O(1) performance of `set()`, `get()`, `has()`, and `remove()` depends on having a good hash function and keeping collisions under control.

---

# 🧪 Testing

The project includes a Jest test suite covering the HashMap's major functionality.

The tests cover:

* Initial HashMap state
* Adding entries
* Retrieving values
* Missing keys
* Checking key existence
* Updating existing keys
* Preventing duplicate entries during updates
* Removing entries
* Removing missing keys
* Collision handling
* HashMap resizing
* Preserving entries after resizing
* Operations after resizing
* Clearing the HashMap
* Adding entries after `clear()`
* Retrieving keys
* Retrieving values
* Retrieving entries

Run the tests with:

```bash
npm test
```

or:

```bash
npx jest hashMap.test.js
```

---

# 📁 Project Structure

```text
HashMap/
│
├── hashMap.js
├── hashMap.test.js
└── linkedList.js
```

### `hashMap.js`

Contains the HashMap implementation and its operations.

### `linkedList.js`

Contains the custom Linked List implementation used for collision handling.

### `hashMap.test.js`

Contains the Jest test suite for verifying the HashMap implementation.

---


# 🎯 Learning Objectives

This project demonstrates an understanding of:

* Hash functions
* Hash codes
* Bucket indexing
* Hash collisions
* Separate chaining
* Linked Lists
* Key-value storage
* Load factors
* Dynamic resizing
* Rehashing / redistribution
* Average-case O(1) lookup
* Worst-case HashMap behavior
* Unit testing with Jest
* JavaScript modules

---

# 🧩 Technologies Used

* **JavaScript**
* **Node.js**
* **Jest**
* **ES Modules**

---

# 📚 Project Context

This project was built as part of **The Odin Project's JavaScript curriculum** while studying data structures and algorithms.

The goal was to implement a HashMap from scratch to understand what happens internally when storing and retrieving key-value pairs, rather than using JavaScript's built-in `Map`.

---

