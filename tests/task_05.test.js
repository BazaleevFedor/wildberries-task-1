import {describe, expect, test} from '@jest/globals';
import {jsonToLinkedList} from "../task_05.js";

class TestNode {
    value;
    next;
}

describe('Проверка конвертации JSON в список', () => {
    test('вложенный объект', async () => {
        const res = new TestNode();
        res.value = {value: 1};
        res.next = new TestNode();
        res.next.value = 2;
        res.next.next = new TestNode();
        res.next.next.value = 3;
        res.next.next.next = null;

        expect(res).toEqual(jsonToLinkedList(JSON.stringify([{value: 1}, 2, 3])));
    });

    test('пустой объект', async () => {
        expect(null).toEqual(jsonToLinkedList(JSON.stringify([])));
    });

    test('еще тестов надааааа', async () => {
        expect('еще тестов надааааа').toEqual(jsonToLinkedList(JSON.stringify([])));
    });
});
