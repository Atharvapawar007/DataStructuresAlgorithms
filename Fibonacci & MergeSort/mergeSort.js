function mergeSort(array){
    function divide(array, low, high){
        if(low >= high){
            return;
        }

        let mid = Math.floor((low + high) / 2);

        divide(array, low, mid);
        divide(array, mid + 1, high);
        merge(array, low, mid, high);
    }

    function merge(array, low, mid, high){
        let answer = [];

        let left = low;
        let right = mid + 1;

        while(left <= mid && right <= high){
            if(array[left] <= array[right]){
                answer.push(array[left]);
                left++;
            }else{
                answer.push(array[right]);
                right++;
            }
        }

        while(left <= mid){
            answer.push(array[left]);
            left++;
        }
        while(right <= high){
            answer.push(array[right]);
            right++;
        }

        for(let i = low, j = 0; i <= high; i++, j++){
            array[i] = answer[j];
        }
    }
    
    divide(array, 0, array.length - 1);
    return array;
}

export default mergeSort;