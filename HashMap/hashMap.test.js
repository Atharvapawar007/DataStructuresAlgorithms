import HashMap from "./hashMap.js";

describe("HashMap", () => {

    let map;

    beforeEach(() => {
        map = HashMap();
    });


    // ============================================================
    // INITIAL STATE
    // ============================================================

    test("should start empty", () => {
        expect(map.length()).toBe(0);
        expect(map.keys()).toEqual([]);
        expect(map.values()).toEqual([]);
        expect(map.entries()).toEqual([]);
    });


    // ============================================================
    // CAPACITY & LOAD FACTOR
    // ============================================================

    test("should start with a capacity of 16", () => {
        expect(map.getCapacity()).toBe(16);
    });

    test("should have a load factor of 0.75", () => {
        expect(map.getLoadFactor()).toBe(0.75);
    });


    // ============================================================
    // SET
    // ============================================================

    test("should add a key-value pair", () => {
        map.set("apple", "red");

        expect(map.get("apple")).toBe("red");
        expect(map.length()).toBe(1);
    });

    test("should add multiple key-value pairs", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        expect(map.length()).toBe(3);
        expect(map.get("apple")).toBe("red");
        expect(map.get("banana")).toBe("yellow");
        expect(map.get("carrot")).toBe("orange");
    });


    // ============================================================
    // OVERWRITE
    // ============================================================

    test("should overwrite the value when the key already exists", () => {
        map.set("apple", "red");
        map.set("apple", "green");

        expect(map.get("apple")).toBe("green");
        expect(map.length()).toBe(1);
    });

    test("overwriting a key should not increase length", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("apple", "green");

        expect(map.length()).toBe(2);
    });


    // ============================================================
    // GET
    // ============================================================

    test("get() should return the correct value", () => {
        map.set("apple", "red");

        expect(map.get("apple")).toBe("red");
    });

    test("get() should return null for a missing key", () => {
        expect(map.get("does not exist")).toBeNull();
    });

    test("get() should return null for a missing key in an empty bucket", () => {
        map.set("apple", "red");

        expect(map.get("not found")).toBeNull();
    });


    // ============================================================
    // HAS
    // ============================================================

    test("has() should return true for an existing key", () => {
        map.set("apple", "red");

        expect(map.has("apple")).toBe(true);
    });

    test("has() should return false for a missing key", () => {
        expect(map.has("apple")).toBe(false);
    });

    test("has() should return false after a key is removed", () => {
        map.set("apple", "red");
        map.remove("apple");

        expect(map.has("apple")).toBe(false);
    });


    // ============================================================
    // LENGTH
    // ============================================================

    test("length() should return the number of stored entries", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        expect(map.length()).toBe(3);
    });

    test("length() should not increase when overwriting", () => {
        map.set("apple", "red");
        map.set("apple", "green");

        expect(map.length()).toBe(1);
    });

    test("length() should decrease after removal", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");

        map.remove("apple");

        expect(map.length()).toBe(1);
    });


    // ============================================================
    // KEYS
    // ============================================================

    test("keys() should return all keys", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        expect(map.keys()).toHaveLength(3);
        expect(map.keys()).toEqual(
            expect.arrayContaining([
                "apple",
                "banana",
                "carrot"
            ])
        );
    });


    // ============================================================
    // VALUES
    // ============================================================

    test("values() should return all values", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        expect(map.values()).toHaveLength(3);
        expect(map.values()).toEqual(
            expect.arrayContaining([
                "red",
                "yellow",
                "orange"
            ])
        );
    });


    // ============================================================
    // ENTRIES
    // ============================================================

    test("entries() should return all key-value pairs", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        expect(map.entries()).toHaveLength(3);

        expect(map.entries()).toEqual(
            expect.arrayContaining([
                ["apple", "red"],
                ["banana", "yellow"],
                ["carrot", "orange"]
            ])
        );
    });


    // ============================================================
    // REMOVE
    // ============================================================

    test("remove() should remove an existing key", () => {
        map.set("apple", "red");

        expect(map.remove("apple")).toBe(true);
        expect(map.has("apple")).toBe(false);
        expect(map.get("apple")).toBeNull();
        expect(map.length()).toBe(0);
    });

    test("remove() should return false for a missing key", () => {
        expect(map.remove("apple")).toBe(false);
    });

    test("remove() should not affect other entries", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        map.remove("banana");

        expect(map.has("apple")).toBe(true);
        expect(map.has("banana")).toBe(false);
        expect(map.has("carrot")).toBe(true);

        expect(map.length()).toBe(2);
    });


    // ============================================================
    // COLLISIONS
    // ============================================================

    test("should handle multiple entries in the same bucket", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");
        map.set("dog", "brown");

        expect(map.get("apple")).toBe("red");
        expect(map.get("banana")).toBe("yellow");
        expect(map.get("carrot")).toBe("orange");
        expect(map.get("dog")).toBe("brown");

        expect(map.length()).toBe(4);
    });


    // ============================================================
    // RESIZING
    // ============================================================

    test("should resize from 16 to 32 when load factor is reached", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");
        map.set("dog", "brown");
        map.set("elephant", "gray");
        map.set("frog", "green");
        map.set("grape", "purple");
        map.set("hat", "black");
        map.set("ice cream", "white");
        map.set("jacket", "blue");
        map.set("kite", "pink");
        map.set("lion", "golden");

        expect(map.getCapacity()).toBe(16);

        map.set("moon", "silver");

        expect(map.getCapacity()).toBe(32);
    });

    test("should preserve all entries after resizing", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");
        map.set("dog", "brown");
        map.set("elephant", "gray");
        map.set("frog", "green");
        map.set("grape", "purple");
        map.set("hat", "black");
        map.set("ice cream", "white");
        map.set("jacket", "blue");
        map.set("kite", "pink");
        map.set("lion", "golden");
        map.set("moon", "silver");

        expect(map.length()).toBe(13);

        expect(map.get("apple")).toBe("red");
        expect(map.get("banana")).toBe("yellow");
        expect(map.get("carrot")).toBe("orange");
        expect(map.get("dog")).toBe("brown");
        expect(map.get("elephant")).toBe("gray");
        expect(map.get("frog")).toBe("green");
        expect(map.get("grape")).toBe("purple");
        expect(map.get("hat")).toBe("black");
        expect(map.get("ice cream")).toBe("white");
        expect(map.get("jacket")).toBe("blue");
        expect(map.get("kite")).toBe("pink");
        expect(map.get("lion")).toBe("golden");
        expect(map.get("moon")).toBe("silver");
    });

    test("should not resize when overwriting an existing key", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");
        map.set("dog", "brown");
        map.set("elephant", "gray");
        map.set("frog", "green");
        map.set("grape", "purple");
        map.set("hat", "black");
        map.set("ice cream", "white");
        map.set("jacket", "blue");
        map.set("kite", "pink");
        map.set("lion", "golden");

        map.set("apple", "green");

        expect(map.getCapacity()).toBe(16);
        expect(map.length()).toBe(12);
        expect(map.get("apple")).toBe("green");
    });

    test("should continue working after resizing", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");
        map.set("dog", "brown");
        map.set("elephant", "gray");
        map.set("frog", "green");
        map.set("grape", "purple");
        map.set("hat", "black");
        map.set("ice cream", "white");
        map.set("jacket", "blue");
        map.set("kite", "pink");
        map.set("lion", "golden");
        map.set("moon", "silver");

        map.set("moon", "white");
        map.set("sun", "yellow");

        expect(map.get("moon")).toBe("white");
        expect(map.get("sun")).toBe("yellow");
        expect(map.length()).toBe(14);
        expect(map.getCapacity()).toBe(32);
    });


    // ============================================================
    // CLEAR
    // ============================================================

    test("clear() should remove all entries", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        map.clear();

        expect(map.length()).toBe(0);
        expect(map.keys()).toEqual([]);
        expect(map.values()).toEqual([]);
        expect(map.entries()).toEqual([]);
    });

    test("clear() should make existing keys unavailable", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");

        map.clear();

        expect(map.has("apple")).toBe(false);
        expect(map.has("banana")).toBe(false);

        expect(map.get("apple")).toBeNull();
        expect(map.get("banana")).toBeNull();
    });

    test("should allow new entries after clear()", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");

        map.clear();

        map.set("hello", "world");
        map.set("foo", "bar");

        expect(map.length()).toBe(2);
        expect(map.get("hello")).toBe("world");
        expect(map.get("foo")).toBe("bar");
    });


    // ============================================================
    // REMOVE AFTER RESIZE
    // ============================================================

    test("should correctly remove entries after resizing", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");
        map.set("dog", "brown");
        map.set("elephant", "gray");
        map.set("frog", "green");
        map.set("grape", "purple");
        map.set("hat", "black");
        map.set("ice cream", "white");
        map.set("jacket", "blue");
        map.set("kite", "pink");
        map.set("lion", "golden");
        map.set("moon", "silver");

        expect(map.getCapacity()).toBe(32);

        expect(map.remove("banana")).toBe(true);
        expect(map.has("banana")).toBe(false);
        expect(map.get("banana")).toBeNull();

        expect(map.length()).toBe(12);
    });


    // ============================================================
    // COMPLETE WORKFLOW
    // ============================================================

    test("should correctly handle a complete HashMap workflow", () => {
        map.set("apple", "red");
        map.set("banana", "yellow");
        map.set("carrot", "orange");

        expect(map.length()).toBe(3);

        map.set("apple", "green");

        expect(map.get("apple")).toBe("green");
        expect(map.length()).toBe(3);

        expect(map.has("banana")).toBe(true);

        map.remove("banana");

        expect(map.has("banana")).toBe(false);
        expect(map.length()).toBe(2);

        expect(map.keys()).toEqual(
            expect.arrayContaining([
                "apple",
                "carrot"
            ])
        );

        expect(map.values()).toEqual(
            expect.arrayContaining([
                "green",
                "orange"
            ])
        );

        map.clear();

        expect(map.length()).toBe(0);
        expect(map.keys()).toEqual([]);
        expect(map.values()).toEqual([]);
        expect(map.entries()).toEqual([]);
    });

});

