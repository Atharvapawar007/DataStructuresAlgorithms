import knightMoves from "./knightMoves.js";

describe("knightMoves", () => {

    test("moves directly to a square one knight move away", () => {
        expect(knightMoves([0, 0], [1, 2]))
            .toEqual([[0, 0], [1, 2]]);
    });

    test("finds a shortest path from [0,0] to [3,3]", () => {
        const path = knightMoves([0, 0], [3, 3]);

        expect(path[0]).toEqual([0, 0]);
        expect(path[path.length - 1]).toEqual([3, 3]);
        expect(path.length).toBe(3);
    });

    test("finds a shortest path from [3,3] to [0,0]", () => {
        const path = knightMoves([3, 3], [0, 0]);

        expect(path[0]).toEqual([3, 3]);
        expect(path[path.length - 1]).toEqual([0, 0]);
        expect(path.length).toBe(3);
    });

    test("finds a shortest path from [0,0] to [7,7]", () => {
        const path = knightMoves([0, 0], [7, 7]);

        expect(path[0]).toEqual([0, 0]);
        expect(path[path.length - 1]).toEqual([7, 7]);
        expect(path.length).toBe(7);
    });

    test("returns the starting position when start and target are the same", () => {
        expect(knightMoves([3, 3], [3, 3]))
            .toEqual([[3, 3]]);
    });

});

