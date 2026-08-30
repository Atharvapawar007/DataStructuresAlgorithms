class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

function LinkedList(){
    let headNode = null;
    let listSize = 0;

    function append(value){
        const node = new Node(value);
        
        if(headNode === null){
            headNode = node;
        }else{
            let temp = headNode;
            while(temp.next != null){
                temp = temp.next;
            }

            temp.next = node;
        }
        listSize++;
    }

    function prepend(value){
        const node = new Node(value);
        if(headNode === null){
            headNode = node;
        }else{
            node.next = headNode;
            headNode = node;
        }
        listSize++;
    }

    function size(){
        return listSize;
    }

    function head(){
        return (headNode === null) ? undefined : headNode.data;
    }

    function tail(){
        if(headNode === null){
            return undefined;
        }
        let temp = headNode;

        while(temp.next != null){
            temp = temp.next;
        }

        return temp.data;
    }

    function at(index){
        if(index < 0){
            return undefined;
        }
        
        let temp = headNode;
        let ind = 0;

        while(temp != null && ind < index){
            temp = temp.next;
            ind++;
        }

        return (temp === null) ? undefined : temp.data;
    }

    function pop(){
        if(headNode === null){
            return undefined;
        }

        let temp = headNode;
        const data = temp.data;
        temp = temp.next;
        headNode = temp;
        listSize--;
        return data;
    }

    function contains(value){
        let temp = headNode;

        while(temp != null && temp.data != value){
            temp = temp.next;
        }

        return (temp === null) ? false : true;
    }

    function findIndex(value){
        let temp = headNode;
        let index = 0;

        while(temp !== null && temp.data !== value){
            temp = temp.next;
            index++;
        }

        return (temp === null) ? -1 : index;
    }

    function toString(){
        let temp = headNode;
        let string = "";

        while(temp != null){
            string += `( ${temp.data} ) -> `;
            temp = temp.next;
        }

        string += "null";

        return string;
    }

    return {
        append,
        prepend,
        size,
        head,
        tail,
        at,
        pop,
        contains,
        findIndex,
        toString
    }
}

export default LinkedList;

