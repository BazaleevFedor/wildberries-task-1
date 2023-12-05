import {beforeEach, describe, expect, test} from '@jest/globals';
import {MyMath} from "../task_03.js";

describe('Библиотека myMath', () => {
    let math;
    beforeEach(() => {
        math = MyMath();
    });

    test('24ое число Фибоначчи (цикл)', async () => {
        expect(46368).toEqual(math.fibonacci(24));
    });

    test('1ое число Фибоначчи (цикл)', async () => {
        expect(1).toEqual(math.fibonacci(1));
    });

    test('2ое число Фибоначчи (цикл)', async () => {
        expect(1).toEqual(math.fibonacci(2));
    });

    test('24ое число Фибоначчи (рекурсия)', async () => {
        expect(46368).toEqual(math.fibonacciRecursive(24));
    });

    test('1ое число Фибоначчи (рекурсия)', async () => {
        expect(1).toEqual(math.fibonacci(1));
    });

    test('2ое число Фибоначчи (рекурсия)', async () => {
        expect(1).toEqual(math.fibonacci(2));
    });

    test('числа Фибоначчи до 24 (цикл)', async () => {
        expect([1, 1, 2, 3, 5, 8, 13, 21]).toEqual(math.fibonacciBeforeN(24));
    });

    test('числа Фибоначчи до 46368 (цикл)', async () => {
        expect([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657]).toEqual(math.fibonacciBeforeN(46368));
    });

    test('числа Фибоначчи до 1 (цикл)', async () => {
        expect([]).toEqual(math.fibonacciBeforeN(1));
    });

    test('числа Фибоначчи до 2 (цикл)', async () => {
        expect([1, 1]).toEqual(math.fibonacciBeforeN(2));
    });

    test('24ое простое число', async () => {
        expect(89).toEqual(math.prime(24));
    });

    test('1ое простое число', async () => {
        expect(2).toEqual(math.prime(1));
    });

    test('2ое простое число', async () => {
        expect(3).toEqual(math.prime(2));
    });

    test('простые числа до 24 (цикл)', async () => {
        expect([2, 3, 5, 7, 11, 13, 17, 19, 23]).toEqual(math.primeBeforeN(24));
    });

    test('простые числа до 1 (цикл)', async () => {
        expect([]).toEqual(math.primeBeforeN(1));
    });

    test('простые числа до 2 (цикл)', async () => {
        expect([]).toEqual(math.primeBeforeN(2));
    });

    test('простые числа до 24 (решето)', async () => {
        expect([2, 3, 5, 7, 11, 13, 17, 19, 23]).toEqual(math.primeEratosthenesBeforeN(24));
    });

    test('простые числа до 1 (решето)', async () => {
        expect([]).toEqual(math.primeEratosthenesBeforeN(1));
    });

    test('простые числа до 2 (решето)', async () => {
        expect([]).toEqual(math.primeEratosthenesBeforeN(2));
    });
});
