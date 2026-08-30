class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

function LinkedList(){
    let headNode = null;
    let listSize = 0;

    function append(key, value){
        const node = new Node(key, value);
        
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

    function prepend(key, value){
        const node = new Node(key, value);
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
        return (headNode === null) ? undefined : [headNode.key, headNode.value];
    }

    function tail(){
        if(headNode === null){
            return undefined;
        }
        let temp = headNode;

        while(temp.next != null){
            temp = temp.next;
        }

        return [temp.key, temp.value];
    }

    function at(index){
        let temp = headNode;
        let ind = 0;

        while(temp != null && ind < index){
            temp = temp.next;
            ind++;
        }

        return (temp === null) ? undefined : temp;
    }

    function pop(){
        if(headNode === null){
            return undefined;
        }

        let temp = headNode;
        const data = [temp.key, temp.value];
        temp = temp.next;
        headNode = temp;
        listSize--;
        return data;
    }

    function remove(key){
        if(headNode === null || !contains(key)){
            return undefined;
        }

        let temp = new Node(-1, -1);
        let dummyHead = temp;
        temp.next = headNode;

        while(temp.next.key !== key){
            temp = temp.next;
        }

        temp.next = temp.next.next;
        headNode = dummyHead.next;
        listSize--;
    }

    function contains(key){
        let temp = headNode;

        while(temp != null && temp.key != key){
            temp = temp.next;
        }

        return (temp === null) ? false : true;
    }

    function findIndex(key){
        let temp = headNode;
        let index = 0;

        while(temp !== null && temp.key !== key){
            temp = temp.next;
            index++;
        }

        return (temp === null) ? -1 : index;
    }

    function toString(){
        let temp = headNode;
        let string = "";

        while(temp != null){
            string += `( ${[temp.key, temp.value]} ) -> `;
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
        remove,
        contains,
        findIndex,
        toString
    }
}

export default LinkedList;

