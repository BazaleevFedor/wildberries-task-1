import {describe, expect, test} from '@jest/globals';
import {isPalindrome, isPalindromeReverse} from "../task_01.js";

describe('Проверка палиндрома', () => {
    test('палиндром (цикл)', async () => {
        expect(true).toEqual(isPalindrome('аргентина манит негра'));
    });

    test('один символ (цикл)', async () => {
        expect(true).toEqual(isPalindrome('а'));
    });

    test('не палиндром (цикл)', async () => {
        expect(false).toEqual(isPalindrome('аргентина манит негров'));
    });

    test('палиндром (рекурсия)', async () => {
        expect(true).toEqual(isPalindromeReverse('аргентина манит негра'));
    });

    test('один символ (рекурсия)', async () => {
        expect(true).toEqual(isPalindromeReverse('а'));
    });

    test('не палиндром (рекурсия)', async () => {
        expect(false).toEqual(isPalindromeReverse('аргентина манит негров'));
    });
});
