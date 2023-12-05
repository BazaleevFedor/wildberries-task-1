/*
    Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
    Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах.
    Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

    Надежность пароля определяется путем подсчета баллов за критерии:
      * Длина пароля.
      * Разные регистры.
      * Использование чисел.
      * Использование специальных символов.
      * Отсутствие года в пароле.
      * Отсутствие пароля в списках простых паролей.

   Новые критерии легко добавить. Массив this._standards нужно дополнить функцией проверки критерия и весом критерия.
*/

import fs from 'fs';

/**
 * Класс-анализатор сложности пароля
 */
class PasswordAnalysis {
    // до 60% от максимальной оценки - хороший результат
    // от 60% до 80% от максимальной оценки - хороший результат
    // от 80% и больше от максимальной оценки - отличный результат
    START_GOOD_SCORE = 0.6;
    START_EXCELLENT_SCORE = 0.8;

    constructor() {
        // задаем критерии оценивания пароля
        // новые критерии можно добавить просто создав элемент массива
        // points - кол-во очков за выполнение критерия (работу анализатора можно регулировать этим полем, меня вес определенного критерия),
        // checking - функция, выполняющая проверку.
        this._standards = [
            {points: 1, checking: this._lengthAnalyzer},
            {points: 1, checking: this._registerAnalyzer},
            {points: 1, checking: this._numbersAnalyzer},
            {points: 1, checking: this._specialCharAnalyzer},
            {points: 1, checking: this._yearsAnalyzer},
            {points: 1, checking: this._listPasswordAnalyzer},
        ];

        // подсчитываем сумму очков всех критериев
        this._maxPoints = this._standards.reduce((acc, {points}) => acc + points, 0);

        // создаем массив с рекомендациями
        this._recommendations = [];
    }

    /**
     * Функция, выполняющая проверку критерия длины пароля.
     * @param password - пароль
     * @param points - максимальное кол-во очков за критерий
     * @return {number|*} - кол-во очков, которые получает пароль за выполнение критерия
     * @private
     */
    _lengthAnalyzer = (password, points) => {
        if (password.length > 12) return points;  // если пароль длинный, возвращаем 100% баллов

        this._recommendations.push('Пароль должен быть длиннее 12 символов');  // добавляем рекомендацию с указанием проблемы пароля
        if (password.length > 8) return points / 2;  // средний пароль - 50%
        return 0;  // маленький - 0 баллов
    }

    /**
     * Функция, выполняющая проверку критерия использования различных регистров в пароле.
     * @param password - пароль
     * @param points - максимальное кол-во очков за критерий
     * @return {number|*} - кол-во очков, которые получает пароль за выполнение критерия
     * @private
     */
    _registerAnalyzer = (password, points) => {
        const hasUppercase = /\p{Lu}/u.test(password);  // проверка наличия символов в верхнем регистре
        const hasLowercase = /\p{Ll}/u.test(password);  // проверка наличия символов в нижнем регистре

        if (hasUppercase && hasLowercase) return points;  // есть оба регистра - 100% баллов

        this._recommendations.push('Пароль должен содержать символы в разных регистрах');
        if (hasUppercase || hasLowercase) return points / 2;  // только один - 50%
        return 0;  // нет текста - 0 баллов
    }

    /**
     * Функция, выполняющая проверку критерия использования чисел в пароле.
     * @param password - пароль
     * @param points - максимальное кол-во очков за критерий
     * @return {number|*} - кол-во очков, которые получает пароль за выполнение критерия
     * @private
     */
    _numbersAnalyzer = (password, points) => {
        const hasNumber = /\d/.test(password);  // проверка наличия чисел

        if (hasNumber) return points;  // есть - 100% баллов

        this._recommendations.push('Пароль должен содержать числа');
        return 0;  // нет - 0 баллов
    }

    /**
     * Функция, выполняющая проверку критерия использования специальных символов в пароле.
     * @param password - пароль
     * @param points - максимальное кол-во очков за критерий
     * @return {number|*} - кол-во очков, которые получает пароль за выполнение критерия
     * @private
     */
    _specialCharAnalyzer = (password, points) => {
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);  // проверяем наличие спецсимволов

        if (hasSpecialChar) return points;  // есть - 100% баллов

        this._recommendations.push('Пароль должен содержать специальные символы - !@#$%^&*()_+{}\[\]:;<>,.?~\\/-');
        return 0;  // нет - 0 баллов
    }

    /**
     * Функция, выполняющая проверку критерия отсутствия упоминания годов (рождения и др.) в пароле.
     * @param password - пароль
     * @param points - максимальное кол-во очков за критерий
     * @return {number|*} - кол-во очков, которые получает пароль за выполнение критерия
     * @private
     */
    _yearsAnalyzer = (password, points) => {
        const currentYear = new Date().getFullYear();  // получаем текущий год
        const year100YearsAgo = currentYear - 100;  // 100 лет назад
        const year100YearsFuture = currentYear + 100;  // 100 лет вперед

        for (let i = year100YearsAgo; i <= year100YearsFuture; i++) {
            if (password.includes(i)) {  // если пароль содержит эти годы, возвращаем 0 баллов
                this._recommendations.push('Пароль не должен содержать год рождения или другие даты');
                return 0;
            }
        }

        return points;  // не содержит - 100% баллов
    }

    /**
     * Функция, выполняющая проверку критерия нахождения пароля в базе простых паролей.
     * @param password - пароль
     * @param points - максимальное кол-во очков за критерий
     * @return {number|*} - кол-во очков, которые получает пароль за выполнение критерия
     * @private
     */
    _listPasswordAnalyzer = (password, points) => {
        // открываем файлы, которые я взял из коллекции SecLists (https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials)
        // в этих файлах будем смотреть плохие пароли
        const passwordListTop100 = fs.readFileSync('./passwords/10-million-password-list-top-100.txt', 'utf-8').split('\n');
        const passwordListTop10000 = fs.readFileSync('./passwords/10-million-password-list-top-10000.txt', 'utf-8').split('\n');

        if (passwordListTop100.includes(password)) {  // если пароль есть в топ 100 плохих, он слишком плохой
            this._recommendations.push('Пароль не должен быть слишком очевидным');
            return 0;  // возвращаем 0 баллов
        }
        if (passwordListTop10000.includes(password)) {
            this._recommendations.push('Пароль не должен быть слишком очевидным');
            return points / 4;  // возвращаем 25% баллов
        }

        return points;  // возвращаем 100% баллов, если в списках его нет
    }

    /**
     * Функция, конвертирующая числовую оценку в словесную.
     * @param points - кол-во очков пароля.
     * @return {string} - словесная оценка пароля.
     * @private
     */
    _pointToScore = (points) => {
        // сравниваем итоговую оценку с максимальной
        if (points / this._maxPoints < this.START_GOOD_SCORE) {  // до START_GOOD_SCORE от максимальной оценки - хороший результат
            return 'плохой';
        } else if (points / this._maxPoints < this.START_EXCELLENT_SCORE) {  // от START_GOOD_SCORE до START_EXCELLENT_SCORE от максимальной оценки - хороший результат
            return 'хороший';
        } else {  // от START_EXCELLENT_SCORE и больше от максимальной оценки - отличный результат
            return 'отличный';
        }
    }

    /**
     * Функция, анализирующая сложность пароля и предоставляющая рекомендации по усовершенствованию.
     * @param password - пароль
     * @return {{score: string, recommendations: []}} - объект с оценкой и рекомендациями.
     */
    analyzer = (password) => {
        this._recommendations = [];  // обновляем рекомендации
        // проходим в цикле reduce по всем критериям оценки пароля и аккумулируем общий счет пароля
        let passwordPoints = this._standards.reduce((acc, {points, checking}) => acc + checking(password, points), 0);

        // возвращаем конвертированную из числа в слово оценку и рекомендации
        return {score: this._pointToScore(passwordPoints), recommendations: this._recommendations};
    }
}

export default new PasswordAnalysis();
