import {describe, expect, test} from '@jest/globals';
import {stringToJson} from "../task_10.js";

describe('Конвертация строки в JSON', () => {
    const testData = [
        // позитивные тесты
        { input: '{"array":[true,1,"str",{"array":[true,1,"str",{"array":[true,1,"str",{"array":[true,1,"str",{"array":[true,1,"str",{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":null}],"number":666,"obj":{},"boolean":true,"string":"str","recursive":null}],"number":666,"obj":{},"boolean":true,"string":"str","recursive":null}],"number":666,"obj":{},"boolean":true,"string":"str","recursive":null}],"number":666,"obj":{},"boolean":true,"string":"str","recursive":{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":null}}],"number":666,"obj":{},"boolean":true,"string":"str","recursive":{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","recursive":null}}}}}}'},
        { input: '{"array":[1,2,{"inArr":"fedor"}],"number":666,"obj":{"name":1}}'},
        { input: '{}'},
        { input: '[1,2,3]'},
        { input: '{"array":[],"number":666,"obj":{}}'},
        { input: '{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},
        { input: '{"ar:ray":[true,1,"s,tr{]",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},
        { input: '{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},

        // негативные тесты
        { input: '"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},  // нет первой фигурной скобки
        { input: '{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null'},  // нет последней фигурной скобки
        { input: '{"array"[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},  // нет двоеточия между ключом и значением
        { input: '{"array":[true,,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},  // нет значения массив
        { input: '{"array":[true,1,"str",null]],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},  // лишняя квадратная скобка
        { input: '{"array'},
        { input: '"array}'},
        { input: '{"array"}'},
        { input: '{"array":[true}'},
        { input: '{"array":[true,1"","str",null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},
        { input: '{"array":[true,1,"str",null],"number":666,"obj":{},"boolean":true,"string":"str","nullll":nullll}'},
        { input: '{1,1,11]'},
        { input: '{"array": [1, 2, {"inArr": "fedor", "number": 666, "obj": {"name": 1}}} ]'},
        { input: '{"array": [1, 2, {"inArr": "fedor", "number": 666, "obj": {"name": 1}], "number": 666}'},
        { input: '{"array": [1, 2, {"inArr": "fedor"}, "number": 666}'},
        { input: '{"array":["a", "b, "c"]}'},
        { input: '{"array":[1,2,{"inArr":"fedor","number":666,"obj":{"name":1}}'},  // несбалансированные скобки
        { input: '{"array":["a", "b", "c"'},  // несбалансированные кавычки
        { input: '{"number": 12.34.56}'},  // неверный формат числа
        { input: '{"key":"value":"anotherValue"}'},  // некорректное использование двоеточия
        { input: '{"array":[true,1,"str"null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},  // некорректное использование запятой
        { input: '{"key": "value}'},  // строки без закрывающих кавычек в объекте
        { input: '{"array":[true,1,"str""null],"number":666,"obj":{},"boolean":true,"string":"str","null":null}'},  // пропущенные запятые в массиве
        { input: '{"key":,"value": "anotherValue"}'},  // пропущенные значения в объекте
        { input: '"'},
        { input: '{][]][{}[]{}][}{}}}}{{}{}{}{]{][]{}'},
    ];

    test.each(testData)('Тест для строки "%s"', ({ input}) => {
        try {
            expect(JSON.parse(input)).toEqual(stringToJson(input));
        } catch (err) {
            expect(() => stringToJson(input)).toThrow();
            expect(() => JSON.parse(input)).toThrow();
        }
    });
});
