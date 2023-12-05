import {describe, expect, test} from '@jest/globals';
import PasswordAnalysis from "../task_23.js";

describe('Анализатор пароля', () => {
    const testData = [
        { input: 'qwerty', result: 'плохой'},
        { input: 'qwerty123', result: 'плохой'},
        { input: 'fedor', result: 'плохой'},
        { input: 'love', result: 'плохой'},

        { input: 'IvanGamer1', result: 'хороший'},

        { input: 'IvanGamer#1', result: 'отличный'},
        { input: 'ASsdaw1lgdJUIjmf6d0n23p4!', result: 'отличный'},
    ];

    test.each(testData)('Тест для пароля "%s"', ({input, result}) => {
        expect(result).toEqual(PasswordAnalysis.analyzer(input).score);
    });
});
