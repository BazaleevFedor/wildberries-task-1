/*
    Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.
    http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true

    Требования:
       * данные должны загружаться при загрузке страницы
       * необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
       * необходимо реализовать клиентскую пагинацию (50 элементов на странице)
*/

const PAGE_SIZE = 50;

class Table {
    constructor() {
        this._fetchData().then((data) => this._init(data));  // отправляем запрос на получение данных из здания.
        // после получения, вызываем init функцию
    }

    /**
     * Функция, получающая данные по урлу
     * @return {Promise<any>} - результат запроса
     * @private
     */
    _fetchData = async () => {
        const response = await fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true');
        return await response.json();
    }

    /**
     * Функция, навешивающая лисенеры
     * @private
     */
    _addListeners = () => {
        const paginatorElems = document.querySelectorAll('.paginator-item');
        Array.from(paginatorElems).forEach((elem) => {  // на все кнопки пагинации
            elem.addEventListener('click', () => {
                const lastCurElem = document.querySelector(`.paginator-item[data-id="${this._curPage}"]`);

                if (elem !== lastCurElem) {  // запрещаем повторное нажатие
                    elem.classList.add('disable');  // меняем цвет на серый
                    lastCurElem.classList.remove('disable');  // отменяем блокировку для прошлой нажатой кнопки

                    this._curPage = Number(elem.getAttribute('data-id'));
                    this._renderTable();  // вызываем отрисовку новой страницы таблицы
                }
            });
        })
    }

    /**
     * Функция начального рендеринга
     * @param data - полученные данные таблицы
     * @private
     */
    _init = (data) => {
        this._curPage = 0;
        this._paginator = new Paginator(data, PAGE_SIZE);  // создаем пагинатор. передаем данные и размер одной страницы
        this._sortTitle = null;

        // отрисовываем страницу, навешиваем лисенеры
        this._renderPaginator();
        this._renderTable();
        this._addListeners();
    }

    /**
     * Функция создания пагинатора
     * @private
     */
    _renderPaginator = () => {
        const paginatorElem = document.querySelector('.paginator');
        for (let i = 0; i < this._paginator.getPageCount(); i++) {  // получаем от пагинатора кол-во станиц, на каждую создаем кнопку
            paginatorElem.innerHTML += (
                `
                    <button class="paginator-item ${i === 0 ? 'disable br-left' : ''} ${i === this._paginator.getPageCount() - 1 ? 'br-right' : ''}" data-id="${i}">${i+1}</button>
                `
            )
        }
    }

    /**
     * Функция меняющая состояние сортировки столбца
     * @param title - столбец
     * @private
     */
    _sortTable = (title) => {
        if (this._sortTitle?.title === title) {  // если текущий столбец сортировки совпадает с выбранным
            if (this._sortTitle.state === 'ascending') {  // меняем возрастание на убывание
                this._sortTitle.state = 'descending';
            } else {  // или убывание на отсутствие сортировки
                this._sortTitle = null;
            }
        } else {  // если сортировка отсутствует, указываем столбец как текущий сортируемый
            this._sortTitle = {title: title, state: 'ascending'};
        }

        this._renderTable();  // перерисовываем таблицу
    }

    _renderTable = () => {
        const tableElem = document.querySelector('.table');

        // запрашиваем данные из пагинатора
        const dataList = this._paginator.getPage(this._curPage, this._sortTitle?.title, this._sortTitle?.state);

        tableElem.innerHTML = '';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headers = Object.keys(dataList[0]);
        const headerRow = document.createElement('tr');

        // создаем заголовки с отслеживанием нажатия для сортировки
        headers.forEach(header => {
            const th = document.createElement('th');
            const button = document.createElement('button');
            button.textContent = header;

            if (this._sortTitle?.title === header) {
                const arrow = document.createElement('span');
                arrow.textContent = this._sortTitle.state === 'ascending' ? ' ↓' : ' ↑';
                button.appendChild(arrow);
            }

            button.addEventListener('click', () => this._sortTable(header));
            th.appendChild(button);
            headerRow.appendChild(th);
        });


        thead.appendChild(headerRow);
        table.appendChild(thead);

        // создаем таблицу
        dataList.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = item[header];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableElem.appendChild(table);
    }
}

class Paginator {
    constructor(data, pageSize) {
        this._dataList = data;  // сохраняем полученные данные
        this._pageSize = pageSize;  // сохраняем кол-во элементов, которое должно быть на одной странице
        this._pageCount = Math.ceil(this._dataList.length / this._pageSize);  // вычисляем кол-во страниц
    }

    /**
     * Функция, возвращающая кол-во страниц в выборке данных
     * @return {number} - кол-во страниц
     */
    getPageCount() {
        return this._pageCount;
    }

    /**
     * Функция, возвращающая нужную страницу данных отсортированную заданным способом
     * @param pageNum - номер страницы
     * @param sortTitle - заголовок, по которому необходимо сортировать
     * @param sortType - тип сортировки (возрастание, убывание)
     * @return {*[]} - массив данных
     */
    getPage(pageNum, sortTitle = null, sortType = null) {
        let res = [];

        // получаем нужную страницу из данных
        for (let i = this._pageSize * pageNum; i < this._pageSize * (pageNum + 1); i++) {
            res.push(this._dataList[i]);
        }

        // сортируем необходимые данные
        if (sortTitle) {
            if (sortType === 'ascending') {
                res.sort((a, b) => a[sortTitle].toString().localeCompare(b[sortTitle].toString()));
            } else {
                res.sort((a, b) => b[sortTitle].toString().localeCompare(a[sortTitle].toString()));
            }
        }

        return res;
    }
}

export default new Table();
