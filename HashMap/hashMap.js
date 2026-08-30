import { Hash } from "node:crypto";
import LinkedList from "./linkedList.js";

function HashMap(){
    const array = [];
    let capacity = 16;
    const loadFactor = 0.75;
    let presentEntries = 0;

    function getCapacity(){
        return capacity;
    }

    function getLoadFactor(){
        return loadFactor;
    }

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    function set(key, value){
        const index = hash(key) % capacity;
        let linkedList = array[index];

        if(linkedList === undefined){
            linkedList = LinkedList();
            array[index] = linkedList;
        }

        if(linkedList.contains(key)){
            const listIndex = linkedList.findIndex(key);
            const listNode = linkedList.at(listIndex);
            listNode.value = value;
        }else{
            linkedList.append(key, value);
            presentEntries++;
        }
        checkResizing();
    }

    function checkResizing(){
        if(presentEntries > (capacity * loadFactor)){
            capacity = capacity * 2;
            redistribute();
        }else{
            return;
        }
    }

    function get(key){
        const index = hash(key) % capacity;
        const linkedList = array[index];

        if(linkedList === undefined || !linkedList.contains(key)){
            return null;
        }

        const listIndex = linkedList.findIndex(key);
        const value = linkedList.at(listIndex).value;
        return value;
    }

    function has(key){
        const index = hash(key) % capacity;
        const linkedList = array[index];

        if(linkedList === undefined || !linkedList.contains(key)){
            return false;
        }

        return true;
    }

    function remove(key){
        const index = hash(key) % capacity;
        const linkedList = array[index];

        if(linkedList === undefined || !linkedList.contains(key)){
            return false;
        }

        linkedList.remove(key);
        presentEntries--;
        return true;
    }

    function length(){
        return presentEntries;
    }

    function clear(){
        for(let i = 0; i < capacity; i++){
            if(array[i] !== undefined){
                const linkedList = array[i];
                let listSize = linkedList.size();
                while(listSize > 0){
                    linkedList.pop();
                    listSize--;
                }
                array[i] = undefined;
            }
        }

        presentEntries = 0;
    }

    function keys(){
        let keySet = [];
        for(let i = 0; i < capacity; i++){
            if(array[i] !== undefined){
                const linkedList = array[i];
                let listSize = linkedList.size();
                for(let j = 0; j < listSize; j++){
                    keySet.push(linkedList.at(j).key);
                }
            }
        }

        return keySet;
    }

    function values(){
        let valueSet = [];
        for(let i = 0; i < capacity; i++){
            if(array[i] !== undefined){
                const linkedList = array[i];
                let listSize = linkedList.size();
                for(let j = 0; j < listSize; j++){
                    valueSet.push(linkedList.at(j).value);
                }
            }
        }

        return valueSet;
    }

    function entries(){
        const entrySet = [];
        for(let i = 0; i < capacity; i++){
            if(array[i] !== undefined){
                const linkedList = array[i];
                let listSize = linkedList.size();
                for(let j = 0; j < listSize; j++){
                    entrySet.push([linkedList.at(j).key, linkedList.at(j).value]);
                }
            }
        }

        return entrySet;
    }

    function redistribute(){
        const entrySet = entries();
        clear();

        for(let i = 0; i < entrySet.length; i++){
            set(entrySet[i][0], entrySet[i][1]);
        }
    }

    return {
        getCapacity,
        getLoadFactor,
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    }
}

export default HashMap;

