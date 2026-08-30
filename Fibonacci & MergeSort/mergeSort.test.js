import mergeSort from "./mergeSort";

describe("mergeSort", () => {
    test("sorts an array of numbers in ascending order", () => {
        expect(mergeSort([5, 3, 8, 1, 2])).toEqual([1, 2, 3, 5, 8]);
    });

    test("sorts an already sorted array", () => {
        expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts a reverse-sorted array", () => {
        expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("handles an array with duplicate values", () => {
        expect(mergeSort([4, 2, 4, 1, 2])).toEqual([1, 2, 2, 4, 4]);
    });

    test("handles an array with negative numbers", () => {
        expect(mergeSort([3, -1, -5, 2, 0])).toEqual([-5, -1, 0, 2, 3]);
    });

    test("handles an array containing one element", () => {
        expect(mergeSort([7])).toEqual([7]);
    });

    test("handles an empty array", () => {
        expect(mergeSort([])).toEqual([]);
    });
});