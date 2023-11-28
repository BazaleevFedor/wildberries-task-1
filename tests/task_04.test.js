import {describe, expect, test} from '@jest/globals';
import {choosingWordsEnding} from "../task_04.js";

describe('Проверка формы слова с числом', () => {
    test('112', async () => {
        expect('112 сообщений').toEqual(choosingWordsEnding(112, {first: 'сообщение', second: 'сообщения', third: 'сообщений'}));
    });

    test('21', async () => {
        expect('21 сообщение').toEqual(choosingWordsEnding(21, {first: 'сообщение', second: 'сообщения', third: 'сообщений'}));
    });

    test('0', async () => {
        expect('0 сообщений').toEqual(choosingWordsEnding(0, {first: 'сообщение', second: 'сообщения', third: 'сообщений'}));
    });

    test('304', async () => {
        expect('304 сообщения').toEqual(choosingWordsEnding(304, {first: 'сообщение', second: 'сообщения', third: 'сообщений'}));
    });

    test('2', async () => {
        expect('2 сообщения').toEqual(choosingWordsEnding(2, {first: 'сообщение', second: 'сообщения', third: 'сообщений'}));
    });
});
