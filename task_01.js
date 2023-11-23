/**
 * Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом.
 * Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).
 */
const isPalindrome = (string) => {
    string = string.replaceAll(' ', '');
    for (let i = 0, j = string.length - 1; i < j; i++, j--) {
        if (string[i] !== string[j]) {
            return false;
        }
    }

    return true;
}

console.log(isPalindrome('аргентина манит негра') === true);
console.log(isPalindrome('a') === true);
console.log(isPalindrome('аргентина манит негров') === false);