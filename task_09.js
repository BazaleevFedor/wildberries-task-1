/*
    Реализовать функцию конвертации JSON в строку.
*/

/**
 * Функцию конвертации JSON в строку.
 * @param data - исходный json
 * @return {string} - строка, содержащая json объект
 */
export const jsonToString = (data) => {
    let res = '';

    if (Array.isArray(data)) {  // если переданные данные являются массивом
        res += '[';  // добавляем символ начала массива
        res += data.reduce((acc, item, index) => {  // добавляем элементы массива в результирующую строку
            acc += jsonToString(item);  // для каждого элемента вызываем рекурсивно конвертацию в строку на случай вложенного объекта
            if (index < data.length - 1) acc += ',';  // если элемент не последний, ставим за ним запятую
            return acc;
        }, '');
        res += ']';  // добавляем символ конца массива
    } else if (data instanceof Object) {  // если переданные данные являются объектом
        res += '{';  // все как и для массива, но у элементов указываем их ключ
        res += Object.keys(data).reduce((acc, item, index, array) => {
            acc += `\"${item}\":${jsonToString(data[item])}`;
            if (index < array.length - 1) acc += ',';
            return acc;
        }, '');
        res += '}';
    } else {  // если переданные данные являются примитивом
        if (typeof data === "string") res += '\"' + data + '\"';  // если строка, оборачиваем в кавычки
        else res += data;
    }

    return res;
}
