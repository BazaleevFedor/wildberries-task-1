import {describe, expect, test} from '@jest/globals';
import {stringToJson} from "../task_10.js";

describe('Конвертация строки в JSON', () => {
    const testData = [
        { input: '{"array":[1,2,{"inArr":"fedor"}],"number":666,"obj":{"name":1}}'},
        { input: '{}'},
        { input: '[1,2,3]'},
        { input: '{"array":[],"number":666,"obj":{}}'},
        { input: '{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},
    ];

    test.each(testData)('Тест для строки "%s"', ({ input}) => {
        expect(JSON.parse(input)).toEqual(stringToJson(input));
    });
});
