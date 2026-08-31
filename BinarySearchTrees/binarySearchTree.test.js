import Tree from "./binarySearchTree.js";

describe("Binary Search Tree", () => {

    // ============================================================
    // INITIALIZATION / BUILD TREE
    // ============================================================

    test("creates a tree with a root node", () => {
        const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

        expect(tree.root).not.toBeNull();
        expect(tree.root).toBeDefined();
    });

    test("removes duplicate values when building the tree", () => {
        const tree = new Tree([10, 5, 10, 3, 5, 7, 3]);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([3, 5, 7, 10]);
    });

    test("builds a balanced binary search tree", () => {
        const tree = new Tree([
            1, 7, 4, 23, 8, 9, 4,
            3, 5, 7, 9, 67, 6345, 324
        ]);

        expect(tree.isBalanced()).toBe(true);
    });


    // ============================================================
    // INCLUDES
    // ============================================================

    test("includes() returns true when value exists", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        expect(tree.includes(10)).toBe(true);
        expect(tree.includes(3)).toBe(true);
        expect(tree.includes(20)).toBe(true);
    });

    test("includes() returns false when value does not exist", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        expect(tree.includes(100)).toBe(false);
        expect(tree.includes(6)).toBe(false);
    });


    // ============================================================
    // INSERT
    // ============================================================

    test("insert() adds a new value to the tree", () => {
        const tree = new Tree([10, 5, 15]);

        tree.insert(3);

        expect(tree.includes(3)).toBe(true);
    });

    test("insert() preserves the binary search tree property", () => {
        const tree = new Tree([10, 5, 15]);

        tree.insert(3);
        tree.insert(7);
        tree.insert(12);
        tree.insert(20);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([3, 5, 7, 10, 12, 15, 20]);
    });

    test("insert() does nothing when value already exists", () => {
        const tree = new Tree([10, 5, 15]);

        tree.insert(10);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([5, 10, 15]);
    });

    test("insert() works when inserting into an empty tree", () => {
        const tree = new Tree([]);

        tree.insert(10);

        expect(tree.root.data).toBe(10);
        expect(tree.includes(10)).toBe(true);
    });


    // ============================================================
    // DELETE
    // ============================================================

    test("deleteItem() does nothing if value does not exist", () => {
        const tree = new Tree([10, 5, 15]);

        tree.deleteItem(100);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([5, 10, 15]);
    });

    test("deleteItem() deletes a leaf node", () => {
        const tree = new Tree([10, 5, 15, 3, 7]);

        tree.deleteItem(3);

        expect(tree.includes(3)).toBe(false);
        expect(tree.includes(5)).toBe(true);
        expect(tree.includes(7)).toBe(true);
    });

    test("deleteItem() deletes a node with one child", () => {
        const tree = new Tree([10, 5, 15, 3]);

        tree.deleteItem(5);

        expect(tree.includes(5)).toBe(false);
        expect(tree.includes(3)).toBe(true);
        expect(tree.includes(10)).toBe(true);
    });

    test("deleteItem() deletes a node with two children", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        tree.deleteItem(5);

        expect(tree.includes(5)).toBe(false);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([3, 7, 10, 12, 15, 20]);
    });

    test("deleteItem() can delete the root node", () => {
        const tree = new Tree([10, 5, 15, 3, 7]);

        tree.deleteItem(10);

        expect(tree.includes(10)).toBe(false);
        expect(tree.root).not.toBeNull();
    });

    test("deleteItem() can delete the only node in the tree", () => {
        const tree = new Tree([10]);

        tree.deleteItem(10);

        expect(tree.root).toBeNull();
    });


    // ============================================================
    // LEVEL ORDER TRAVERSAL
    // ============================================================

    test("levelOrderForEach() visits nodes in level order", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        const values = [];

        tree.levelOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([
            10,
            5, 15,
            3, 7, 12, 20
        ]);
    });

    test("levelOrderForEach() passes values rather than nodes", () => {
        const tree = new Tree([10, 5, 15]);

        tree.levelOrderForEach((value) => {
            expect(typeof value).toBe("number");
        });
    });

    test("levelOrderForEach() throws an error without a callback", () => {
        const tree = new Tree([10, 5, 15]);

        expect(() => {
            tree.levelOrderForEach();
        }).toThrow();
    });


    // ============================================================
    // IN-ORDER TRAVERSAL
    // ============================================================

    test("inOrderForEach() visits nodes in in-order", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([3, 5, 7, 10, 12, 15, 20]);
    });

    test("inOrderForEach() throws an error without a callback", () => {
        const tree = new Tree([10, 5, 15]);

        expect(() => {
            tree.inOrderForEach();
        }).toThrow();
    });


    // ============================================================
    // PRE-ORDER TRAVERSAL
    // ============================================================

    test("preOrderForEach() visits nodes in pre-order", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        const values = [];

        tree.preOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([10, 5, 3, 7, 15, 12, 20]);
    });

    test("preOrderForEach() throws an error without a callback", () => {
        const tree = new Tree([10, 5, 15]);

        expect(() => {
            tree.preOrderForEach();
        }).toThrow();
    });


    // ============================================================
    // POST-ORDER TRAVERSAL
    // ============================================================

    test("postOrderForEach() visits nodes in post-order", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        const values = [];

        tree.postOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([3, 7, 5, 12, 20, 15, 10]);
    });

    test("postOrderForEach() throws an error without a callback", () => {
        const tree = new Tree([10, 5, 15]);

        expect(() => {
            tree.postOrderForEach();
        }).toThrow();
    });


    // ============================================================
    // HEIGHT
    // ============================================================

    test("height() returns the height of a leaf node", () => {
        const tree = new Tree([10, 5, 15, 3, 7]);

        expect(tree.height(5)).toBe(0);
        expect(tree.height(15)).toBe(0);
    });

    test("height() returns the height of the root", () => {
        const tree = new Tree([10, 5, 15, 3, 7]);

        expect(tree.height(7)).toBe(2);
    });

    test("height() returns the correct height for an internal node", () => {
        const tree = new Tree([10, 5, 15, 3, 7]);

        expect(tree.height(3)).toBe(1);
        expect(tree.height(10)).toBe(1);
    });

    // ============================================================
    // DEPTH
    // ============================================================

    test("depth() returns 0 for the root", () => {
        const tree = new Tree([10, 5, 15]);

        expect(tree.depth(10)).toBe(0);
    });

    test("depth() correctly calculates depth independently of node height", () => {
        const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

        expect(tree.depth(2)).toBe(1);
        expect(tree.depth(6)).toBe(1);
        expect(tree.depth(1)).toBe(2);
        expect(tree.depth(3)).toBe(2);
        expect(tree.depth(5)).toBe(2);
        expect(tree.depth(7)).toBe(2);
    });

    test("depth() returns undefined when value does not exist", () => {
        const tree = new Tree([10, 5, 15]);

        expect(tree.depth(100)).toBeUndefined();
    });

    // ============================================================
    // IS BALANCED
    // ============================================================

    test("isBalanced() returns true for a balanced tree", () => {
        const tree = new Tree([10, 5, 15, 3, 7, 12, 20]);

        expect(tree.isBalanced()).toBe(true);
    });

    test("isBalanced() returns false for an unbalanced tree", () => {
        const tree = new Tree([10]);

        tree.insert(20);
        tree.insert(30);
        tree.insert(40);
        tree.insert(50);

        expect(tree.isBalanced()).toBe(false);
    });

    test("isBalanced() checks every node, not only the root", () => {
        const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

        tree.insert(8);
        tree.insert(9);
        tree.insert(10);

        expect(tree.isBalanced()).toBe(false);
    });


    // ============================================================
    // REBALANCE
    // ============================================================

    test("rebalance() balances an unbalanced tree", () => {
        const tree = new Tree([10]);

        tree.insert(20);
        tree.insert(30);
        tree.insert(40);
        tree.insert(50);

        expect(tree.isBalanced()).toBe(false);

        tree.rebalance();

        expect(tree.isBalanced()).toBe(true);
    });

    test("rebalance() preserves all values", () => {
        const tree = new Tree([10]);

        tree.insert(20);
        tree.insert(30);
        tree.insert(40);
        tree.insert(50);

        tree.rebalance();

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([10, 20, 30, 40, 50]);
    });

    test("rebalance() produces a valid BST", () => {
        const tree = new Tree([10]);

        tree.insert(20);
        tree.insert(30);
        tree.insert(40);
        tree.insert(50);

        tree.rebalance();

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([...values].sort((a, b) => a - b));
    });

    test("rebalance() keeps the tree balanced after multiple insertions", () => {
        const tree = new Tree([50]);

        for (let i = 51; i <= 100; i++) {
            tree.insert(i);
        }

        expect(tree.isBalanced()).toBe(false);

        tree.rebalance();

        expect(tree.isBalanced()).toBe(true);
    });


    // ============================================================
    // EDGE CASES
    // ============================================================

    test("works with an empty array", () => {
        const tree = new Tree([]);

        expect(tree.root).toBeNull();
        expect(tree.isBalanced()).toBe(true);
    });

    test("works with a single value", () => {
        const tree = new Tree([42]);

        expect(tree.root.data).toBe(42);
        expect(tree.height(42)).toBe(0);
        expect(tree.depth(42)).toBe(0);
        expect(tree.isBalanced()).toBe(true);
    });

    test("handles duplicate values correctly", () => {
        const tree = new Tree([
            10, 10, 10,
            5, 5, 5,
            15, 15, 15
        ]);

        const values = [];

        tree.inOrderForEach((value) => {
            values.push(value);
        });

        expect(values).toEqual([5, 10, 15]);
    });

});

