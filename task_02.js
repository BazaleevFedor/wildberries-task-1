/**
 * Задача о странных числах: Напишите функцию, которая принимает число и возвращает true, если это число
 * является странным, и false в противном случае. Странным числом считается число, которое равно сумме
 * всех своих делителей, кроме самого себя.
 */
const isStrange = (number) => {
    let divisorsSum = 0;

    return number === divisorsSum;
}

console.log(isStrange() === true);
console.log(isStrange() === true);
console.log(isStrange() === false);