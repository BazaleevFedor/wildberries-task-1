/*
    Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
*/

/**
 * Функция, удаляющая лишние пробелы из строки
 * @param string - исходная строка
 * @return {*} - строка без незначащих пробелов
 */
const removeSpase = (string) => {
    return string.replace(/("[^"]*")|\s+/g, (match, capturedGroup) => {
        if (capturedGroup) {  // если есть захваченная группа (текст внутри кавычек), вернуть её без изменений
            return capturedGroup;
        }
        return '';  // иначе удалить пробелы
    });
}

/**
 * Функция, выполняющая парсинг объекта в массив элементов
 * @param string - строка, представляющая объект json
 * @return {*[]} - массив элементов
 */
const commaSplit = (string) => {
    string = string.slice(1, -1);  // удаляем скобки объекта или массива
    // создаем переменные, хранящие информацию о скобках. фигурные и квадратные задаем числами т.к. может быть вложенность объектов.
    // кавычки же не могут быть вложенными, поэтому достаточно хранить информацию строка сейчас считывается или нет.
    let quote = {
        curlyOpen: 0,  // фигурная открывающая скобка - {
        curlyClose: 0,  // фигурная закрывающая скобка - }
        squareOpen: 0,  // квадратная открывающая скобка - [
        squareClose: 0,  // квадратная открывающая скобка - ]
        isString: false,  // открыта
    }
    let res = [];
    let startElem = 0;

    for (let i = 0; i < string.length; i++) {  // проходим по всем символам строки
        if (string[i] === '"') {  // если символ является кавычкой, меняем состояние isString (либо это конец строки, либо начало)
            quote.isString = !quote.isString;
        }

        if (!quote.isString) {  // если элемент не является частью строки, разбираем его подробнее
            // увеличиваем соответсвующий счетчик кол-ва скобок (это позволит выявить ошибки со скобками)
            if (string[i] === '[') {
                quote.squareOpen++;
            } else if (string[i] === ']') {
                quote.squareClose++;
            } else if (string[i] === '{') {
                quote.curlyOpen++;
            } else if (string[i] === '}') {
                quote.curlyClose++;
            }

            // если встречаем запятую, которая находится на верхнем уровне вложенности (это можно определить по кол-ву открытых скобок в данный момент.
            // если кол-во открытых и закрытых скобок равно, значит мы находимся на верхнем уровне) или доходим до конца исходного объекта, добавляем объект, который
            // начинается с индекса startElem и заканчивается в текущем индексе.
            if ((string[i] === ',' || i === string.length - 1) && !(quote.squareOpen - quote.squareClose) && !(quote.curlyOpen - quote.curlyClose)) {
                if (i === string.length - 1) {
                    res.push(string.slice(startElem, i + 1)); // включаем текущий элемент т.к. дошли до конца строки, а не до запятой
                } else {
                    res.push(string.slice(startElem, i)); // не включаем текущий элемент т.к. там запятая
                    startElem = i + 1;  // индекс startElem переставляем на текущий + 1. там начнется следующий элемент
                }
            }
        }

        if (i === string.length - 1) {  // когда дошли до конца строки, проверяем счетчики
            if (quote.isString) {  // какая-то строка не была закрыта, выводим ошибку
                throw new SyntaxError(`Unterminated string in JSON`);
            }
            if (quote.squareOpen - quote.squareClose) {  // квадратная скобка не была закрыта (кол-во открытых не равно закрытым), выводим ошибку
                throw new SyntaxError(`Expected ',' or ']' after array element in JSON`);
            }
            if (quote.curlyOpen - quote.curlyClose) {  // фигурная скобка не была закрыта (кол-во открытых не равно закрытым), выводим ошибку
                throw new SyntaxError(`Expected ',' or '}' after property value in JSON`);
            }
        }
    }

    return res;  // возвращаем полученный массив
}

/**
 * Функция поиска индекса двоеточия, разделяющего ключ и значение
 * @param string - строка поиска
 * @return {number} - индекс двоеточия
 */
const findFirstColonIndex = (string) => {
    // получаем индекс двоеточия с отступом от второй кавычки. '"key":"value"' для этой строки вернется индекс двоеточия
    let dotsIndex = string.indexOf(':', string.indexOf('"', string.indexOf('"') + 1) + 1);

    if (dotsIndex === -1) {  // если индекс не найден, возвращаем ошибку
        throw new SyntaxError('Expected \':\' after property name in JSON');
    }

    return dotsIndex;  // возвращаем индекс
}

/**
 * Функция конвертации строки в JSON со всеми необходимыми проверками и валидациями
 * @param string - исходная строка
 * @return {*} - JSON
 */
export const stringToJson = (string) => {
    string = removeSpase(string);  // удаляем все лишние (незначащие) пробелы
    if (string[0] === '[') {  // если строка представляет массивом
        if (string[string.length - 1] !== ']') {  // проверяем, что массив имеет закрывающую скобку
            throw new SyntaxError(`Expected ',' or ']' after array element in JSON`);
        }

        return commaSplit(string).reduce((acc, elem) => {  // парсим массив с помощью commaSplit и проходим по элементам массива
            acc.push(stringToJson(elem));  // для каждого элемента рекурсивно вызываем парсинг и добавляем результат в массив
            return acc;
        }, []);  // полученный массив возвращаем
    } else if (string[0] === '{') {  // если строка представляет объектом
        if (string[string.length - 1] !== '}') {  // проверяем, что объект имеет закрывающую скобку
            throw new SyntaxError(`Expected ',' or '}' after property value in JSON`);
        }

        return commaSplit(string).reduce((acc, elem) => {  // парсим объект с помощью commaSplit и проходим по элементам объекта
            const dotsIndex = findFirstColonIndex(elem);  // находим индекс двоеточия, которое разделяет ключ и значение элемента
            const key = elem.slice(0, dotsIndex);  // получаем ключ элемента (находится слева от двоеточия)
            const value = elem.slice(dotsIndex + 1);  // получаем значение элемента (находится справа от двоеточия)

            // если ключ не заключен в кавычки " или их больше двух, выводим ошибку
            if (string.length < 1 || key[0] !== '"' || key[key.length - 1] !== '"' || key.slice(1, -1).includes('"')) {
                throw new SyntaxError('Expected \':\' after property name in JSON');
            }

            acc[key.slice(1, -1)] = stringToJson(value);  // записываем в объект по ключу значение, которое рекурсивно получаем при парсинге
            return acc;
        }, {});  // возвращаем объект
    } else {  // если строка представляет примитив
        const numericValue = parseFloat(string);
        if (string === 'false') {  // если строка false - возвращаем значение
            return false;
        } else if (string === 'true') {  // если строка true - возвращаем значение
            return true;
        } else if (string === 'null') {  // если строка null - возвращаем значение
            return null;
        } else if (!isNaN(numericValue) && /^-?\d+(\.\d+)?$/.test(string)) {  // если строка парсится в число и содержит только символы необходимые для задания чисел
            return numericValue;  // возвращаем число
        } else if (string.length > 1 && string[0] === '"' && string[string.length - 1] === '"' && !string.slice(1, -1).includes('"')) {
            return string.slice(1, -1);  // если строка заключена в кавычки " и их только две, выводим строку
        } else {
            throw new SyntaxError(`Unexpected value '${string}' in JSON`);  // иначе выводим ошибку
        }
    }
}
