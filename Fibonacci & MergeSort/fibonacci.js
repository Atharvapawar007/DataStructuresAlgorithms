function fibonacci(number){
    if(number <= 0){
        return [];
    }else if(number == 1){
        return [0];
    }else if(number == 2){
        return [0, 1];
    }

    number--;
    let fib = [];
    fib[0] = 0;
    fib[1] = 1;

    function fibonacciSequence(n){
        let fib_1 = (fib[n - 1] !== undefined) ? fib[n - 1] : fibonacciSequence(n - 1);
        let fib_2 = (fib[n - 2] !== undefined) ? fib[n - 2] : fibonacciSequence(n - 2);

        const num = fib_1 + fib_2;
        fib.push(num);
        return num;
    }

    fibonacciSequence(number);
    return fib;
}

export default fibonacci;



