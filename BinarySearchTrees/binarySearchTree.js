import mergeSort from "../Fibonacci & MergeSort/mergeSort.js";

class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function Tree(array){

    let root = buildTree(array);

    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    function prettyPrint(node, prefix = '', isLeft = true){
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }


    function buildTree(array){
        const filteredArray = removeDuplicates(array);
        mergeSort(filteredArray);
        
        return buildTreeRecursive(filteredArray, 0, filteredArray.length - 1);
    }

    function buildTreeRecursive(array, start, end){
        if(start > end) return null;

        let mid = Math.floor((start + end) / 2);

        const node = new Node(array[mid]);

        node.left = buildTreeRecursive(array, start, mid - 1);
        node.right = buildTreeRecursive(array, mid + 1, end);

        return node;
    }

    function includes(target, node = root){
        if(node === null) return false;

        let isPresent = false;

        if(node.data > target) {
            isPresent = isPresent || includes(target, node.left);
        } else if(node.data < target) {
            isPresent = isPresent || includes(target, node.right);
        } else {
            isPresent = isPresent || true;
        }

        return isPresent;
    }

    function inOrderForEach(callback, node = root){
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if(node === null) return;

        inOrderForEach(callback, node.left);
        callback(node.data);
        inOrderForEach(callback, node.right);
    }

    function preOrderForEach(callback, node = root){
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if(node === null) return;

        callback(node.data);
        preOrderForEach(callback, node.left);
        preOrderForEach(callback, node.right);
    }

    function postOrderForEach(callback, node = root){
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if(node === null) return;

        postOrderForEach(callback, node.left);
        postOrderForEach(callback, node.right);
        callback(node.data);
    }

    function levelOrderForEach(callback, node = root){
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        if(node === null) return;

        const queue = []
        queue.push(node);

        while(queue.length != 0){
            let treeNode = queue.shift();
            callback(treeNode.data);

            if(treeNode.left != null) queue.push(treeNode.left);
            if(treeNode.right != null) queue.push(treeNode.right);
        }
    }

    function insert(value, node = root){
        if(node === null){
            node = new Node(value);
            root = node;
            return;
        }
        while(true){
            if(node.data > value){
                if(node.left !== null){
                    node = node.left;
                }else{
                    node.left = new Node(value);
                    return;
                }
            }else if(node.data < value){
                if(node.right !== null){
                    node = node.right;
                }else{
                    node.right = new Node(value);
                    return;
                }
            }else{
                return;
            }
        }
    }

    function connector(node){
        if(node.left === null) return node.right;
        if(node.right === null) return node.left;

        let leftNode = node.left;
        let rightNode = node.right;
        let currNode = rightNode;

        while(currNode.left != null){
            currNode = currNode.left;
        }

        currNode.left = leftNode;
        return rightNode;
    }

    function deleteItem(key, node = root){
        if(node === null) return;

        if(node.data === key){
            root = connector(root);
            return;
        }

        while(node != null){
            if(node.data > key){
                if(node.left != null && node.left.data === key){
                    node.left = connector(node.left);
                    return;
                }else{
                    node = node.left;
                }
            }else if(node.data < key){
                if(node.right != null && node.right.data === key){
                    node.right = connector(node.right);
                    return;
                }else{
                    node = node.right;
                }
            }
        }
    }

    function height(key, node = root){
        while(node != null){
            if(node.data === key){
                return findHeight(node);
            }else if(node.data > key){
                node = node.left;
            }else{
                node = node.right;
            }
        }

        return undefined;
    }

    function findHeight(node){
        const leftHeight = (node.left === null) ? 0 :  1 + findHeight(node.left);
        const rightHeight = (node.right === null) ? 0 : 1 + findHeight(node.right);

        return Math.max(leftHeight, rightHeight);
    }

    function depth(key, node = root){
        let currentDepth = 0;

        while(node !== null){
            if(node.data > key){
                node = node.left;
            }else if(node.data < key){
                node = node.right;
            }else{
                return currentDepth;
            }
            currentDepth++;
        }

        return undefined;
    }

    function isBalanced(node = root){
        return isBalancedTree(node);
    }

    function isBalancedTree(node){
        if(node === null) return true;

        const leftSubtreeHeight = (node.left === null) ? 0 : findHeight(node.left);
        const rightSubtreeHeight = (node.right === null) ? 0 : findHeight(node.right);

        if(Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1){
            return false;
        }else{
            return isBalancedTree(node.left) && isBalancedTree(node.right);
        }
    }

    function rebalance(){
        const array = [];
        inOrderForEach(a => {
            array.push(a);
        });

        root = buildTree(array);
    }

    return {
        get root() {
            return root;
        },
        prettyPrint,
        includes,
        inOrderForEach,
        preOrderForEach,
        postOrderForEach,
        levelOrderForEach,
        insert,
        deleteItem,
        height,
        depth,
        isBalanced,
        rebalance
    }
}

export default Tree;