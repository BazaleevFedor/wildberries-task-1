/*
    Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается
    с данными об изображении, когда оно загружено. Когда говорится "промис разрешается с данными об изображении",
    это означает, что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как
    изображение будет загружено.
*/

/**
 * Функция, принимающая URL изображения и возвращающая промис с данными изображения
 * @param url - урл изображения
 * @return {Promise<unknown>} - промис с данными
 */
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();  // создаем элемент изображения

        img.onload = () => {  // обработчик успешной загрузки
            resolve(img);
        };

        img.onerror = (error) => {  // обработчик ошибки
            reject(error);
        };

        img.src = url;  // указываем урл изображения
    });
}

// пример использования (task_14.html)
const imageUrl = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSGfpQ3m-QWiXgCBJJbrcUFdNdWAhj7rcUqjeNUC6eKcXZDAtWm';

loadImage(imageUrl)
    .then((img) => {
        document.body.appendChild(img); // добавляем изображение к body, когда оно загрузится
    })
    .catch((error) => {
        console.error('Ошибка при загрузке изображения:', error);  // выводим ошибку, если она произошла
    });
