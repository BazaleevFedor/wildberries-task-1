/*
    Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи.
    При изменении данных в localStorage в консоль должен выводиться объем занятой памяти/максимальный размер хранилища.
*/

/**
 * Функция, определяющая размер localStorage
 * @return {number} - строка с единицами измерения
 */
export const getCurLocalStorageSize = () => {  // использование ф-и добавлено в 19 задание
    let total = 0;  // итоговое кол-во байт
    for (const key in localStorage) {  // проходим по ключам localStorage
        if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length + key.length) * 2;  // увеличиваем кол-во байт на размер ключа и значения
        }
    }

    return total; // возвращаем итоговое кол-во байт
}
