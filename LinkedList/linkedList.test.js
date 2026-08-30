import LinkedList from "./linkedList.js";

describe("LinkedList", () => {
    let list;

    beforeEach(() => {
        list = new LinkedList();
    });

    // =========================
    // INITIAL STATE
    // =========================

    test("should start empty", () => {
        expect(list.size()).toBe(0);
        expect(list.head()).toBeUndefined();
        expect(list.tail()).toBeUndefined();
        expect(list.toString()).toBe("null");
    });

    // =========================
    // APPEND
    // =========================

    test("append() should add an element to an empty list", () => {
        list.append(10);

        expect(list.size()).toBe(1);
        expect(list.head()).toBe(10);
        expect(list.tail()).toBe(10);
        expect(list.toString()).toBe("( 10 ) -> null");
    });

    test("append() should add elements to the end", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.toString()).toBe(
            "( 10 ) -> ( 20 ) -> ( 30 ) -> null"
        );
    });

    test("append() should correctly update size", () => {
        list.append(10);
        expect(list.size()).toBe(1);

        list.append(20);
        expect(list.size()).toBe(2);

        list.append(30);
        expect(list.size()).toBe(3);
    });

    test("append() should allow duplicate values", () => {
        list.append(10);
        list.append(20);
        list.append(20);
        list.append(30);

        expect(list.toString()).toBe(
            "( 10 ) -> ( 20 ) -> ( 20 ) -> ( 30 ) -> null"
        );

        expect(list.size()).toBe(4);
    });

    // =========================
    // PREPEND
    // =========================

    test("prepend() should add an element to an empty list", () => {
        list.prepend(10);

        expect(list.size()).toBe(1);
        expect(list.head()).toBe(10);
        expect(list.tail()).toBe(10);
        expect(list.toString()).toBe("( 10 ) -> null");
    });

    test("prepend() should add elements to the beginning", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        list.prepend(5);
        list.prepend(1);

        expect(list.toString()).toBe(
            "( 1 ) -> ( 5 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> null"
        );
    });

    test("prepend() should correctly update size", () => {
        list.prepend(10);
        expect(list.size()).toBe(1);

        list.prepend(20);
        expect(list.size()).toBe(2);

        list.prepend(30);
        expect(list.size()).toBe(3);
    });

    // =========================
    // HEAD
    // =========================

    test("head() should return undefined for an empty list", () => {
        expect(list.head()).toBeUndefined();
    });

    test("head() should return the first element", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.head()).toBe(10);
    });

    test("head() should return the only element in a single-element list", () => {
        list.append(42);

        expect(list.head()).toBe(42);
    });

    // =========================
    // TAIL
    // =========================

    test("tail() should return undefined for an empty list", () => {
        expect(list.tail()).toBeUndefined();
    });

    test("tail() should return the last element", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.tail()).toBe(30);
    });

    test("tail() should return the only element in a single-element list", () => {
        list.append(42);

        expect(list.tail()).toBe(42);
    });

    test("tail() should change when a new element is appended", () => {
        list.append(10);
        expect(list.tail()).toBe(10);

        list.append(20);
        expect(list.tail()).toBe(20);

        list.append(30);
        expect(list.tail()).toBe(30);
    });

    // =========================
    // SIZE
    // =========================

    test("size() should return 0 for an empty list", () => {
        expect(list.size()).toBe(0);
    });

    test("size() should increase when elements are added", () => {
        list.append(10);
        list.append(20);
        list.prepend(5);

        expect(list.size()).toBe(3);
    });

    // =========================
    // AT
    // =========================

    test("at() should return undefined for an empty list", () => {
        expect(list.at(0)).toBeUndefined();
    });

    test("at() should return the element at index 0", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.at(0)).toBe(10);
    });

    test("at() should return elements at valid indices", () => {
        list.append(10);
        list.append(20);
        list.append(30);
        list.append(40);

        expect(list.at(0)).toBe(10);
        expect(list.at(1)).toBe(20);
        expect(list.at(2)).toBe(30);
        expect(list.at(3)).toBe(40);
    });

    test("at() should return undefined for an index equal to size", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.at(3)).toBeUndefined();
    });

    test("at() should return undefined for an index greater than size", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.at(100)).toBeUndefined();
    });

    test("at() should return undefined for a negative index", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.at(-1)).toBeUndefined();
    });

    // =========================
    // POP
    // =========================

    test("pop() should return undefined for an empty list", () => {
        expect(list.pop()).toBeUndefined();
    });

    test("pop() should remove the first element", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.pop()).toBe(10);

        expect(list.toString()).toBe(
            "( 20 ) -> ( 30 ) -> null"
        );
    });

    test("pop() should correctly update size", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        list.pop();

        expect(list.size()).toBe(2);
    });

    test("pop() should update head after removal", () => {
        list.append(10);
        list.append(20);

        list.pop();

        expect(list.head()).toBe(20);
    });

    test("pop() should update tail when removing from a two-element list", () => {
        list.append(10);
        list.append(20);

        list.pop();

        expect(list.tail()).toBe(20);
    });

    test("pop() should leave an empty list after removing its only element", () => {
        list.append(42);

        expect(list.pop()).toBe(42);

        expect(list.size()).toBe(0);
        expect(list.head()).toBeUndefined();
        expect(list.tail()).toBeUndefined();
        expect(list.toString()).toBe("null");
    });

    test("pop() should remove elements in order", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.pop()).toBe(10);
        expect(list.pop()).toBe(20);
        expect(list.pop()).toBe(30);
        expect(list.pop()).toBeUndefined();

        expect(list.size()).toBe(0);
    });

    // =========================
    // CONTAINS
    // =========================

    test("contains() should return false for an empty list", () => {
        expect(list.contains(10)).toBe(false);
    });

    test("contains() should return true when the value exists", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.contains(20)).toBe(true);
    });

    test("contains() should return false when the value does not exist", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.contains(100)).toBe(false);
    });

    test("contains() should work with duplicate values", () => {
        list.append(10);
        list.append(20);
        list.append(20);

        expect(list.contains(20)).toBe(true);
    });

    // =========================
    // FIND INDEX
    // =========================

    test("findIndex() should return -1 for an empty list", () => {
        expect(list.findIndex(10)).toBe(-1);
    });

    test("findIndex() should return the correct index", () => {
        list.append(10);
        list.append(20);
        list.append(30);
        list.append(40);

        expect(list.findIndex(10)).toBe(0);
        expect(list.findIndex(20)).toBe(1);
        expect(list.findIndex(30)).toBe(2);
        expect(list.findIndex(40)).toBe(3);
    });

    test("findIndex() should return -1 when the value does not exist", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.findIndex(100)).toBe(-1);
    });

    test("findIndex() should return the first occurrence of a duplicate", () => {
        list.append(10);
        list.append(20);
        list.append(30);
        list.append(20);

        expect(list.findIndex(20)).toBe(1);
    });

    // =========================
    // TO STRING
    // =========================

    test("toString() should return null for an empty list", () => {
        expect(list.toString()).toBe("null");
    });

    test("toString() should correctly represent a single-element list", () => {
        list.append(10);

        expect(list.toString()).toBe(
            "( 10 ) -> null"
        );
    });

    test("toString() should correctly represent multiple elements", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        expect(list.toString()).toBe(
            "( 10 ) -> ( 20 ) -> ( 30 ) -> null"
        );
    });

    test("toString() should correctly represent duplicate values", () => {
        list.append(10);
        list.append(20);
        list.append(20);
        list.append(30);

        expect(list.toString()).toBe(
            "( 10 ) -> ( 20 ) -> ( 20 ) -> ( 30 ) -> null"
        );
    });

    // =========================
    // COMBINED WORKFLOW
    // =========================

    test("should correctly handle a complete linked list workflow", () => {
        list.append(10);
        list.append(20);
        list.append(30);

        list.prepend(5);

        expect(list.size()).toBe(4);
        expect(list.head()).toBe(5);
        expect(list.tail()).toBe(30);

        expect(list.contains(20)).toBe(true);
        expect(list.findIndex(20)).toBe(2);
        expect(list.at(2)).toBe(20);

        expect(list.pop()).toBe(5);
        expect(list.size()).toBe(3);

        expect(list.head()).toBe(10);
        expect(list.tail()).toBe(30);

        expect(list.toString()).toBe(
            "( 10 ) -> ( 20 ) -> ( 30 ) -> null"
        );
    });
});