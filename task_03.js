/*
    Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
    вычисление N-го числа в ряду Фибоначчи
    вычисление всех чисел в ряду Фибоначчи до числа N
    вычисление N-го простого числа
    вычисление всех простых чисел до числа N
    Будет плюсом, если задумаетесь и об оптимизации.
*/

export const MyMath = () => {
    let memoFibonacci = new Map();
    let memoPrime = new Map();
    return {
        /**
         * Вычисление N-го числа в ряду Фибоначчи с помощью цикла
         * @param N - номер необходимого числа Фибоначчи
         * @return {number} - N-ое число в ряду Фибоначчи
         */
        fibonacci (N) {
            let fib1 = 1, fib2 = 1;  // задаем первые два числа Фибоначчи
            for (let i = 2; i < N; i++) {  // в цикле идем до нужного числа
                const tmp = fib1;
                fib1 = fib2;  // меняя переменные по формуле
                fib2 += tmp;
            }

            return fib2;
        },

        /**
         * Вычисление N-го числа в ряду Фибоначчи с помощью рекурсии
         * @param N - номер необходимого числа Фибоначчи
         * @return {number} - N-ое число в ряду Фибоначчи
         */
        fibonacciRecursive (N) {
            if (N === 1 || N === 2) {  // прерываем рекурсию если N <= 2
                return 1;
            }

            if (memoFibonacci.has(N)) {
                return memoFibonacci.get(N);  // берем из кэша значения, если уже вычисляли их
            } else {
                const fibonacciN = this.fibonacciRecursive(N - 2) + this.fibonacciRecursive(N - 1);  // рекурсивно вычисляем новое значение
                memoFibonacci.set(N, fibonacciN);  // сохраняем новое значение
                return fibonacciN;
            }
        },

        /**
         * Вычисление всех чисел в ряду Фибоначчи до числа N с помощью цикла
         * @param N - номер необходимого числа Фибоначчи
         * @return {number[]} - ряд чисел Фибоначчи до числа N
         */
        fibonacciBeforeN (N) {
            let res = N >= 2 ? [1, 1] : [];  // задаем начальные данные результирующего массива

            let fib1 = 1, fib2 = 1;
            for (let i = 2; fib2 + fib1 < N; i++) {  // проходим в цикле до нужного числа
                const tmp = fib1;
                fib1 = fib2;
                fib2 += tmp;
                res.push(fib2);  // добавляем число Фибоначчи на каждой итерации
            }

            return res;
        },

        /**
         * Проверка числа на простоту
         * @param N - проверяемое число
         * @return {boolean} - является ли оно простым
         */
        _isPrime(N) {
            for (let i = 2; i*i <= N; i++) {  // проходим в цикле от 2 (минимальный делитель) до sqrt(N) (максимальный)
                if (N % i === 0) return false;  // если делится без остатка - не простое т.к. есть делитель кроме 1 и самого числа
            }
            return true;  // если в цикле не нашли делители - число простое
        },

        /**
         * Вычисление N-го простого числа с помощью цикла
         * @param N - индекс нужного простого числа
         * @return {number|null} - простое число
         */
        prime(N) {
            if (N < 1) return null;  // проверяем исходный индекс простого числа. оно должно быть больше 1

            if (memoPrime.has(N)) {  // если уже вызывалась эта ф-я с данными параметрами, возвращаем сохраненный результат
                return memoPrime.get(N);
            } else {
                let curPrime = 2;
                for (let curNumber =  3, curPrimeIndex = 1; curPrimeIndex < N; curNumber++) {  // выполняем цикл пока не найдем N простых
                    if (this._isPrime(curNumber)) {  // если текущее число простое
                        curPrimeIndex++;            // увеличиваем индекс текущего простого
                        curPrime = curNumber;       // сохраняем само простое
                    }
                }

                //memoPrime.set(N, curPrime);
                return curPrime; // возвращаем текущее простое
            }
        },

        /**
         * Вычисление всех простых чисел до числа N с помощью цикла
         * @param N - исходное число
         * @return {number[]} - массив простых чисел
         */
        primeBeforeN(N) {
            let prime = [];

            for (let i = 2; i < N; i++) {  // проходим по всем числам до N
                if (this._isPrime(i)) prime.push(i);  // добавляем в результирующий массив только простые числа
            }

            return prime;
        },

        /**
         * Вычисление всех простых чисел до числа N с помощью Решета Эратосфена
         * @param N - исходное число
         * @return {number[]} - массив простых чисел
         */
        primeEratosthenesBeforeN(N) {
            let isPrime = Array(N).fill(true);  // создаем массив из N элементов, заполненный true
            isPrime[0] = false; isPrime[1] = false;  // 0 и 1 не простые, сразу отмечаем false

            for (let i = 2; i * i <= N; i++) {  // в цикле от 2 до sqrt(N)
                if (isPrime[i]) { // если число отмечено простым проходим по всему массиву с шагом в это число и отмечаем false (т.к. при умножении этого числа на любое другое получится непростое число)
                    for (let j = i * i; j < N; j += i) isPrime[j] = false;
                }
            }

            return isPrime.reduce((acc, item, index) => {  // возвращаем только числа, у которых true стоит в массиве
                if (item) acc.push(index);
                return acc;
            }, []);
        }
    }
}
