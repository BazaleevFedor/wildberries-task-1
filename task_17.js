/*
    Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле
    с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
    Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.

    Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.
*/

// реализация - task_17.html

const API_KEY = '9e2fd573-85cb-4c1a-97c5-39b1f874bbbb';
const URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=`;
const DELAY = 400;

const inputElem = document.getElementById('js-input');
const addressContainerElem = document.getElementById('js-address');

/**
 * Функция-обертка, оторая откладывает вызовы func, пока не пройдёт delay миллисекунд бездействия (без вызовов)
 * @param func - вызываемая функция
 * @param delay - промежуток бездействия, после которого вызывается функция
 * @return {(function(...[*]): void)|*} - функция, которую можно вызывать
 */
const debounce = (func, delay) => {
    let timeoutId;  // переменная, хранящая информацию о таймере

    return (...args) => {  // возвращаем функцию
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(args), delay);  // если функция вызвана повторно до завершения таймера, таймер обнуляется
        // вызов откладывается на delay
    }
}

/**
 * Функция, получающая список адресов
 * @param address - текущий адрес
 * @return {Promise<*>} - результат запроса
 */
const getAddresses = async (address) => {
    const response = await fetch(URL + address); // отправляем запрос по урлу
    const data = await response.json();  // парсим ответ
    return data.response?.GeoObjectCollection?.featureMember;  // возвращаем список адресов
}

/**
 * Функция отрисовки списка адресов
 * @param addresses - список адресов
 */
const renderAddresses = (addresses) => {
    if (addresses?.length) {
        addressContainerElem.innerHTML = addresses.reduce((acc, {GeoObject}) => {  // проходимся по массиву и добавляем на каждый адрес элемент кнопки с адресов на ней
            const {name, description} = GeoObject;
            // на кнопку вешаем лисенер, который при нажатии на кнопку перенесет текст с кнопки в поле ввода и вызовет обновление списка адресов
            // если есть и поле name, и description, разделяем их запятой, иначе выводим на кнопку только одно
            acc += `<button onclick="inputElem.value = this.innerHTML; debounceInput(inputElem.value)" style="text-align: left; background: inherit; border: 0">${name && description ? name + ', ' + description : name || description || ''}</button>`;
            return acc;
        }, '');
        addressContainerElem.style.display = 'grid';  // если есть адреса, показываем панель с адресами
    } else {
        addressContainerElem.style.display = 'none';  // если адресов нет, скрываем панель с адресами
    }
}

const debounceInput = debounce(async (address) => {
    if (address.toString()) {  // если в поле ввода что-то есть
        const addresses = await getAddresses(address);  // запрашиваем адреса
        renderAddresses(addresses);  // отрисовываем их
    } else {
        addressContainerElem.style.display = 'none';  // иначе скрываем панель адресов
    }
}, DELAY);

inputElem.addEventListener('input', () => debounceInput(inputElem.value));  // при вводе в инпут вызываем ф-ю с запросом адресов
// нажатие на любое место body кроме поля input приводит к скрытию панели с адресами
document.querySelector('body').addEventListener('click', (e) => addressContainerElem.style.display = 'none');
inputElem.addEventListener('click', (e) => e.stopPropagation());
