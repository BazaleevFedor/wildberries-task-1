/*
    Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
        112 сообщениЙ
        12 сообщений
        1 сообщение
        1024 пользователя
        1026 пользователей
        121 пользователь
    Функцию надо упаковать в модуль.
*/

/**
 * Функция, изменяющая окончание слов в зависимости от падежа.
 * @param count - количество
 * @param first - первая форма слова
 * @param second - вторая форма слова
 * @param third - третья форма слова
 * @return {string} - итоговая строка с числом и словом в нужной форме.
 */
export const choosingWordsEnding = (count, {first, second, third}) => {  // упаковываем ф-ю в модуль
    let result = count.toString() + ' ';  // добавляем в итоговую строку число
    if (count % 10 === 1 && count % 100 !== 11) {  // если число заканчивается на 1, но не заканчивается на 11, выбираем первую форму
        result += first;
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {  // если последняя цифра [2, 4] но последние две не в (10, 20], вторую форму
        result += second;
    } else {  // в остальных случаях выбираем третью форму
        result += third;
    }
    return result;  // возвращаем строку
}