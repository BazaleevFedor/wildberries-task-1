/*
    Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для
    работы с датами. Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.
*/

import moment from 'moment';

export const getCurDate = () => {
    return moment().locale('ru').format('LLLL');
}

export const getUntilEndDay = () => {
    return moment().locale('ru').endOf('day').fromNow();
}

console.log('Сегодня ' + getCurDate())
console.log('Конец дня ' + getUntilEndDay())
