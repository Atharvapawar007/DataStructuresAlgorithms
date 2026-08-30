import fibonacci from "./fibonacci";

describe("fibonacci", () => {
    test("returns an empty array for 0", () => {
        expect(fibonacci(0)).toEqual([]);
    });

    test("returns the first Fibonacci number for 1", () => {
        expect(fibonacci(1)).toEqual([0]);
    });

    test("returns the first two Fibonacci numbers for 2", () => {
        expect(fibonacci(2)).toEqual([0, 1]);
    });

    test("returns the correct Fibonacci sequence for 5", () => {
        expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
    });

    test("returns the correct Fibonacci sequence for 10", () => {
        expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    test("handles larger values correctly", () => {
        expect(fibonacci(15)).toEqual([
            0,
            1,
            1,
            2,
            3,
            5,
            8,
            13,
            21,
            34,
            55,
            89,
            144,
            233,
            377
        ]);
    });
});