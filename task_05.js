/*
    Разработайте функцию преобразования JSON в связный список.
    На входе функция должна получать JSON, содержащий список объектов, на выходе объект,
    представляющий из себя односвязный список.
*/

class Node {  // класс, описывающий узел односвязного списка
    value;  // значение узла
    next = null;  // указатель на следующий узел
    constructor(value) {
        this.value = value;
    }
}

/**
 * Функция преобразования JSON в односвязный список.
 * @param json - json строка
 * @return {Node|null} - указатель на первый узел односвязного списка. null если нет элементов
 */
export const jsonToLinkedList = (json) => {
    const objectList = JSON.parse(json);  // парсим полученную json строку

    if (!objectList.length) return null;  // если массив не содержит элементов, возвращаем null

    const headNode = new Node(objectList[0]);  // создаем корень дерева со значением первого элемента списка
    let curNode = headNode;  // в переменной curNode будем хранить указатель на последний узел

    for (let i = 1; i < objectList.length; i++) {  // в цикле по всем элементам массива
        curNode.next = new Node(objectList[i]);  // создаем новый узел и указатель на него записываем в поле next предыдущего
        curNode = curNode.next;  // меняем указатель на последний узел на новый узел
    }

    return headNode;  // возвращаем указатель на самый первый узел односвязного списка.
}
