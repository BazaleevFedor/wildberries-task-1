import {describe, expect, jest, test} from '@jest/globals';
import {callFuncArray} from "../task_07.js";

describe('Вызов массива функций', () => {
    test('проверка порядка', async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {}); // Подменяем console.log

        const mockFunctions = [
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
        ];

        await callFuncArray(mockFunctions);

        // проверяем, что функции вызывались в правильном порядке
        expect(mockFunctions[0]).toHaveBeenCalled();
        expect(mockFunctions[1]).toHaveBeenCalled();
        expect(mockFunctions[2]).toHaveBeenCalled();
        expect(mockFunctions[3]).toHaveBeenCalled();

        // проверяем, что console.log вызывался с правильными аргументами
        expect(mockConsoleLog.mock.calls[0][0]).toBe(1);
        expect(mockConsoleLog.mock.calls[1][0]).toBe(2);
        expect(mockConsoleLog.mock.calls[2][0]).toBe(3);
        expect(mockConsoleLog.mock.calls[3][0]).toBe(4);

        mockConsoleLog.mockRestore(); // восстанавливаем оригинальный console.log
    });
});
