import {describe, expect, test} from '@jest/globals';
import {jsonToString} from "../task_09.js";
import {stringToJson} from "../task_10.js";

describe('Конвертация JSON в строку', () => {
    const testData = [
        { input: {
            array: [1, 2, {inArr: 'fedor'}],
            number: 666,
            obj: {name: 1}}
        },
        { input: {}},
        { input: [1, 2, 3]},
        { input: {
            array: [],
            number: 666,
            obj: {}}
        },
        { input: {
            array: [true, 1, 'str', null],
            number: 666,
            obj: {},
            boolean: true,
            string: 'str',
            null: null}
        },
    ];

    test.each(testData)('Тест для объекта "%s"', ({ input}) => {
        expect(JSON.stringify(input)).toEqual(jsonToString(input));
    });
});
