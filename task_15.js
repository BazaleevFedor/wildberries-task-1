/*
    Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await для
    ожидания выполнения других асинхронных операций, и возвращает результат выполнения.
*/

/**
 * Асинхронная функция, ожидающая выполнения асинхронных функций, переданных аргументами
 * @param functions - функции
 * @return {Promise<Awaited<unknown>[]>} - промис, разрешающийся с результатами выполнения функций
 */
const callAsyncFunc = async (...functions) => {
    return await Promise.all(functions.map(func => func()));  // ждем выполнения всех промисов. с помощью map заменяем все ф-и на результат их выполнения.
}

const getUserInfo = async () => {
    return new Promise(resolve => setTimeout(() => resolve({userName: 'Fedor', isAuthorized: true}), 50));  // ф-я возвращает данные через 50 мс после вызова
}

const getAnythingElse = async () => {
    return new Promise(resolve => setTimeout(() => resolve({something: 'something'}), 300));  // ф-я возвращает данные через 300 мс после вызова
}

callAsyncFunc(getUserInfo, getAnythingElse).then(console.log)  // вызываем ф-ю, передаем асинхронные ф-и, результат выполнения которых нам вернется
