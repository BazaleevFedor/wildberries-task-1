import {describe, expect, test} from '@jest/globals';
import {isStrange} from "../task_02.js";

describe('Проверка странности числа', () => {
    test('странное', async () => {
        expect(true).toEqual(isStrange(6));
    });

    test('странное среднее', async () => {
        expect(true).toEqual(isStrange(8128));
    });

    test('странное большое', async () => {
        expect(true).toEqual(isStrange(33550336));
    });

    test('не странное', async () => {
        expect(false).toEqual(isStrange(497));
    });
});
