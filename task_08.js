/*
    Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, которая
    вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.
*/

/**
 * Синхронная функция, возвращающая функцию-обработчик массива функций
 * @param functions - массив синхронных функций
 * @return {function(): *} - функция-обработчик массива функций
 */
const callFuncArray = (functions) => {
    return () => {  // возвращаем функцию
        return functions.map(func => func());  // которая возвращает массив, в котором все ф-и с помощью map заменены на результат их выполнения.
    };
}

/**
 * Асинхронная функция, возвращающая функцию-обработчик массива функций
 * @param functions - массив функций
 * @return {function(): Promise<Awaited<unknown>[]>} - функция-обработчик массива функций
 */
const callFuncArrayAsync = (functions) => {
    return async () => {  // возвращаем функцию
        return await Promise.all(functions.map(func => func()));  // ждем выполнения всех промисов. с помощью map заменяем все ф-и на результат их выполнения.
    };
}

const foo = callFuncArrayAsync([
    () => new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    () => new Promise(resolve => setTimeout(() => resolve(2), 100)),
    () => 3,
    () => new Promise(resolve => setTimeout(() => resolve(4), 500)),
    () => new Promise(resolve => setTimeout(() => resolve(5), 3000)),]);

console.time('myProgram');  // начать отсчет времени

foo().then(console.log);




