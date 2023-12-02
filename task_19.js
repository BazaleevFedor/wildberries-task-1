/*
    Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов
    очень много). Например, с помощью этой функции API VK (https://dev.vk.com/ru/method/wall.get).
    Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до
    конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных:
    если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее
    данные (новые данные должны подгружаться с учетом уже загруженных ранее).

    При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.
*/

import {testLocalStorageSize} from './task_18.js'
import {getCurLocalStorageSize} from './task_20.js'

const API_TOKEN = '3fd0da083fd0da083fd0da08a83cc6a46433fd03fd0da085ab92e37a720a513b6f7fc44';  // серверный токен
const GROUP_ID = '29534144';
const POSTS_COUNT = 10;
let offset = Number(localStorage.getItem('offset')) || 0; // получаем offset из кеша. если его нет, задаем 0

const postArea = document.getElementById('js-post-area');
const groupAvatar = document.getElementById('js-avatar');
const groupTitle = document.getElementById('js-title');
const widget = document.querySelector('.widget');

/**
 * Функция отправки запроса с помощью jsonp
 * @param url - урл запроса
 * @param type - тип запроса (запрос постов или данных группы)
 * @return {Promise<unknown>} - результат запроса
 */
const request = async (url, type) => {
    return new Promise((resolve) => {  // т.к. cors ру
        const script = document.createElement('SCRIPT');  // создаем динамический script элемент
        script.src = url + `&callback=requestCallback${type}`;  // указываем адрес, с которого будут загружаться данные, переданный callback будет вызван когда данные загрузятся
        document.querySelector('body').appendChild(script);  // добавляем элемент в DOM

        // т.к. одновременно могут выполняться несколько запросов, для каждого необходимо указать свой callback. чтобы одновременно не мог быть вызван один и тот-же
        // т.к. callback должен быть виден из глобального контекста, где скрипт создает элемент SCRIPT.
        window[`requestCallback${type}`] = (res) => {  // после загрузки будет вызван этот callback
            resolve(res.response);  // разрешаем промис с данными из запроса
        }
    });
}

/**
 * Функция, запрашивающая новые посты.
 * @param count - количество новых постов
 */
const getGroupsPosts = async (count = POSTS_COUNT) => {  // по умолчанию константное кол-во
    let response = await request(`https://api.vk.com/method/wall.get?owner_id=-${GROUP_ID}&count=${count}&offset=${offset}&access_token=${API_TOKEN}&v=5.199`, 'getPosts');

    response.items.forEach((newPost) => {  // вызываем на каждый новый пост ф-ю для добавления поста в DOM
        addNewPosts([newPost]);
    });

    cachePosts(response.items);  // кешируем новые посты

    offset += count;  // увеличиваем смещение на кол-во полученных постов
    localStorage.setItem('offset', (offset).toString());  // кешируем смещение
}

/**
 * Функция, запрашивающая информацию о группе.
 * @return {Promise<void>}
 */
const getGroupInfo = async () => {
    let groupInfo;
    if (localStorage.hasOwnProperty('cacheGroupInfo')) {  // если информация хранится в кеше, используем ее
        groupInfo = JSON.parse(localStorage.getItem('cacheGroupInfo'));
    } else {  // иначе выполняем запрос для получения информации
        groupInfo = await request(`https://api.vk.com/method/groups.getById?group_id=${GROUP_ID}&access_token=${API_TOKEN}&v=5.199`, 'getGroup');

        if (testLocalStorageSize().freeSize > JSON.stringify(groupInfo).length * 2) {
            localStorage.setItem('cacheGroupInfo', JSON.stringify(groupInfo));  // кешируем полученную информацию

            // Задание 20. Вывод используемого и доступного для использования объема localStorage
            console.log(`${getCurLocalStorageSize() / 1000} Кбайт/${testLocalStorageSize().freeSize} Кбайт`);
        }
    }

    setGroupInfo(groupInfo.groups[0]);  // вызываем ф-ю, заполняющую информацию о группе в DOM
}

/**
 * Функция, задающая начальные данные страницы
 */
const init = () => {
    getGroupInfo();  // задаем данные группы

    if (localStorage.hasOwnProperty('cachePosts')) {  // если посты уже есть в кеше, не запрашиваем их, а сразу добавляем их в DOM
        addNewPosts(JSON.parse(localStorage.getItem('cachePosts')));
    } else {
        if (offset) offset -= POSTS_COUNT;  // если для кеширования постов нет места, а под offset есть. загрузим последние POSTS_COUNT постов, а не первые.
        getGroupsPosts();  // если постов нет в кеше, запрашиваем их
    }

    addListener();  // добавляем лиссенеры
}

/**
 * Функция кеширования новых постов
 * @param posts - новые посты
 */
const cachePosts = (posts) => {
    const cache = localStorage.getItem('cachePosts') || '';
    // получаем старый лист постов из кеша. если кеш пуст, задаем как []
    let postList = JSON.parse(localStorage.getItem('cachePosts')) || [];
    const freeMemory = testLocalStorageSize().freeSize / 2;  // символов может поместиться в свободное место кеша

    if (freeMemory < JSON.stringify(posts).length * 2) {  // если свободного места в кеше не хватает под новые посты
        if (JSON.stringify(posts).length < cache?.length + freeMemory) {  // если удаление старого кеша позволит сохранить новый
            // удаляем старые посты пока не станет достаточно места
            let removeLength = 0;
            // освобождаемое место в сумме с уже свободным должно хватить для постов
            while (removeLength + freeMemory < JSON.stringify(posts).length && postList.length) {  // пока не освободим необходимый объем памяти
                removeLength += JSON.stringify(postList[0]).length;  // увеличиваем освобожденный объем на размер первого элемента
                postList = postList.slice(1);  // удаляем первый элемент
            }
        } else {  // если даже с удалением всех постов из кеша, места не хватает (постараемся сохранить хоть что-то)
            // сохраняем максимальное кол-во постов с конца
            let curLength = JSON.stringify(posts).length;  // текущий размер - размер всех новых постов
            while (curLength > freeMemory + cache.length && posts.length) {  // пока текущий размер превышает доступный
                curLength -= JSON.stringify(posts[0]).length;
                posts = posts.slice(1);  // удаляем наиболее старые посты из кэша
            }

            postList = [];  // удаляем старый кеш
        }
    }

    if (posts.length) localStorage.setItem('cachePosts', JSON.stringify([...postList, ...posts]));  // сохраняем посты, которые помещаются в кеш

    // Задание 20. Вывод используемого и доступного для использования объема localStorage
    console.log(`${getCurLocalStorageSize() / 1000} Кбайт/${testLocalStorageSize().freeSize} Кбайт`);
}

/**
 * Функция добавления новых постов
 * @param result - массив новых постов
 */
const addNewPosts = (result) => {
    postArea.innerHTML += result.reduce((acc, post) => {  // проходимся по всем новым постам
        acc += postRender(post);  // добавляем компонент поста
        return acc;
    }, '');
}

/**
 * Функция, возвращающая html код поста
 * @param post - данные поста
 * @return - html код
 */
const postRender = (post) => {
    return (`
        <div class="post" id="js-post-${post.id}">
            <div class="line"></div>
            <div class="text"> ${post.text} </div>
            <div class="attachments"> ${attachmentsRender(post.attachments)} </div>
        </div>
    `);  // вызываем отрисовку для вложений отдельного поста
}

/**
 * Функция, возвращающая html код вложений поста
 * @param attachments - данные вложений
 * @return {*} - html код
 */
const attachmentsRender = (attachments) => {
    return attachments.reduce((acc, {photo}) => {
        const url = photo?.sizes?.at(-1)?.url;
        if (url) acc += (`<img src="${url}" alt="attachment">`);  // если вложения есть, указываем их в посте. иначе вложения будут пустыми
        return acc;
    }, '')
}

/**
 * Функция, вносящая информацию о группе в DOM
 * @param group - данные группы
 */
const setGroupInfo = (group) => {
    groupAvatar.src = group.photo_200;  // задаем фото группы
    groupTitle.innerText = group.name;  // задаем название группы
}

/**
 * Функция, навешивающая лисенеры.
 */
const addListener = () => {
    widget.addEventListener('scroll', () => {  // лисенер на скролл
        if (widget.scrollTop + widget.clientHeight >= widget.scrollHeight - 500) {  // за 500 пикселей до конца виджета
            getGroupsPosts();  // вызываем добавление новых постов
        }
    });
}

init();  // вызываем инициализирующую загрузку данных
