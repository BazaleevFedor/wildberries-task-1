/*
    Задача на работу с объектами: создайте объект, представляющий собой книгу. Объект должен иметь свойства,
    такие как: название книги, автор и год издания. Напишите методы для получения и изменения значений свойств книги.
*/

const book = {
    _title: 'Теоретический минимум по Computer Science',
    _author: 'Владстон Феррейра Фило',
    _year: 2018,

    /**
     * Функция для получения значения поля по названию свойства.
     * @param key - название возвращаемого свойства ('year', 'author' или 'title')
     * @return {*} - значение свойств.
     */
    get(key) {
        if (this[`_${key}`]) {  // проверяем есть ли запрашиваемое св-во у объекта
            return this[`_${key}`];  // возвращаем его значение, если есть
        } else {  // иначе ошибку
            throw new Error('invalid type value. possible options: year, author, title');
        }
    },

    /**
     * Функция для изменения значения поля по названию свойства и новому значению.
     * @param key - название изменяемого свойства ('year', 'author' или 'title')
     * @param value - новое значение свойства
     */
    set(key, value) {
        if (this[`_${key}`]) {  // проверяем есть ли запрашиваемое св-во у объекта
            this[`_${key}`] = value;  // изменяем его значение, если есть
        } else {  // иначе ошибку
            throw new Error('invalid type value. possible options: year, author, title');
        }
    }
}

console.log(book.get('year'));
book.set('year', 102)
console.log(book.get('year'));
console.log(book.get('yer'));
