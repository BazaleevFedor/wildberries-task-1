import {describe, expect, test} from '@jest/globals';
import {arraySort} from "../task_06.js";

describe('Сортировка объектов', () => {
    test('сортировка по возрасту', async () => {
        expect([
            { name: 'John3', age: 1 },
            { name: 'John4', age: 13 },
            { name: 'John1', age: 25 },
            { name: 'John2', age: 26 },
        ]).toEqual(arraySort([
            { name: 'John1', age: 25 },
            { name: 'John2', age: 26 },
            { name: 'John3', age: 1 },
            { name: 'John4', age: 13 },
        ]));
    });

    test('сортировка по имени', async () => {
        expect([
            { name: 'John1', age: 1 },
            { name: 'John2', age: 1 },
            { name: 'John3', age: 1 },
            { name: 'John4', age: 1 },
            { name: 'John5', age: 1 },
        ]).toEqual(arraySort([
            { name: 'John3', age: 1 },
            { name: 'John5', age: 1 },
            { name: 'John2', age: 1 },
            { name: 'John4', age: 1 },
            { name: 'John1', age: 1 },
        ]));
    });

    test('сортировка и по возрасту, и по имени', async () => {
        expect([
            { name: 'John3', age: 1 },
            { name: 'John10', age: 13 },
            { name: 'John13', age: 13 },
            { name: 'John1', age: 25 },
            { name: 'John2', age: 26 },
        ]).toEqual(arraySort([
            { name: 'John1', age: 25 },
            { name: 'John2', age: 26 },
            { name: 'John3', age: 1 },
            { name: 'John13', age: 13 },
            { name: 'John10', age: 13 },
        ]));
    });
});
