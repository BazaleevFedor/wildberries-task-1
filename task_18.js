/*
    Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.
*/

/**
 * Функция, дублирующая строку указанное кол-во раз
 * @param string - строка
 * @param count - кол-во дублирований
 * @return {string} - итоговая строка
 */
export const repeat = (string, count) => {
    let tmp = '';
    while (count--) {  // пока count > 0 прибавляем к tmp нашу строку
        tmp += string;
    }
    return tmp;  // возвращаем строку
}

// 1 символ в UTF-16 занимает 2 байта. создадим переменные под определенные размеры данных
export const n10b =    '012345';                     // 10 байт
export const n100b =   repeat(n10b, 10);       // 100 байт
export const n1kib =   repeat(n100b, 10);      // 1 кбайт
export const n10kib =   repeat(n1kib, 10);     // 10 кбайт
export const n100kib =   repeat(n10kib, 10);   // 100 кбайт

/**
 * Функция, определяющая размер localStorage
 * @param includes - необязательный параметр, указывающий строку, которую содержат ключи
 * @return {number} - строка с единицами измерения
 */
const getCurLocalStorageSize = (includes = '') => {
    let total = 0;  // итоговое кол-во байт
    for (const key in localStorage) {  // проходим по ключам localStorage
        if (localStorage.hasOwnProperty(key) && key.includes(includes)) {  // если ключ содержит строку includes, учитываем его
            total += (localStorage[key].length + key.length) * 2;  // увеличиваем кол-во байт на размер ключа и значения
        }
    }

    return total; // возвращаем итоговое кол-во байт
}

/**
 * Функция проводящая замер размеров localStorage
 * @return {{freeSize: number, size: number}} - размер с ед. измерения
 */
export const testLocalStorageSize = () => {
    let res = {size: 0, freeSize: 0};
    let i = 0;

    try {  // помещаем в try ... catch чтобы остановить выполнение при переполнении localStorage
        for (let j = 0; j < 10000; j++) {  // добавляем по 100 Кбайт на каждой итерации
            localStorage.setItem(`test-bazaleev-${i++}`, n100kib);
        }
    } catch (err) {
        try {  // для повышения точности после получения ошибки при добавлении по 100 Кбайт начинаем добавлять по 100 байт
            for (let j = 0; j < 10000; j++) {
                localStorage.setItem(`test-bazaleev-${i++}`, n100b);  // 100 байт
            }
        } catch (err) {  // когда и тут получим переполнение
            res.size = getCurLocalStorageSize();  // указываем текущий размер localStorage
            res.freeSize = getCurLocalStorageSize('test-bazaleev');  // указываем текущий размер localStorage
            for (const key in localStorage) {  // удаляем созданные поля в localStorage
                if (localStorage.hasOwnProperty(key) && key.includes('test-bazaleev')) {
                    localStorage.removeItem(key);
                }
            }
        }
    }

    return res;
}
