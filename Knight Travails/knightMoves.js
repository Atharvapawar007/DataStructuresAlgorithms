import HashMap from "../HashMap/hashMap.js"

function knightMoves(start, target){
    const moves = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
        [1, -2],
        [2, -1],
        [-1, -2],
        [-2, -1]
    ]

    const visited = []

    for(let i = 0; i < 8; i++){
        const row = [];
        for(let j = 0; j < 8; j++){
            row.push(false);
        }
        visited.push(row);
    }
    visited[start[0]][start[1]] = true;

    let found = false;
    const hashMap = HashMap();

    function getValidMoves(position){
        const validMoves = [];

        for(let i = 0; i < moves.length; i++){
            const move = [position[0] + moves[i][0], position[1] + moves[i][1]];
            if(isValid(move)){
                validMoves.push(move);
            }
        }

        return validMoves;
    }

    function isValid(move){
        if(move[0] < 0 || move[0] >= 8) return false;
        if(move[1] < 0 || move[1] >= 8) return false;

        return true;
    }

    function generatePath(start, target){
        const queue = [];
        queue.push(start);
        hashMap.set(`${start}`, null);

        while(queue.length != 0 && !found){
            const node = queue.shift();
            const validMoves = getValidMoves(node);

            for(let i = 0; i < validMoves.length; i++){
                const newNode = [validMoves[i][0], validMoves[i][1]];
                if(isSame(newNode, target)){
                    found = true;
                    hashMap.set(`${newNode}`, node);
                    visited[newNode[0]][newNode[1]] = true;
                    break;
                }else if(!visited[newNode[0]][newNode[1]]){
                    visited[newNode[0]][newNode[1]] = true;
                    hashMap.set(`${newNode}`, node);
                    queue.push(newNode);
                }
            }
        }
    }

    function isSame(arr1, arr2){
        if(arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;

        return false;
    }

    function getPath(start, target){
        const path = [];
        path.push(target);
        let currentNode = target;

        while(!isSame(currentNode, start)){
            let preNode = hashMap.get(`${currentNode}`);
            path.push(preNode);
            currentNode = preNode;
        }

        return path;
    }

    function printResult(path){
        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
        for(let i = path.length - 1; i >= 0; i--){
            console.log(`[${path[i]}]`);
        }
    }

    generatePath(start, target);
    const path = getPath(start, target);
    printResult(path);

    return path.reverse();
}

export default knightMoves;