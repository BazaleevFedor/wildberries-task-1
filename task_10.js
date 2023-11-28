/*
    Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
*/

const removeSpase = (string) => {
    return string.replace(/("[^"]*")|\s+/g, (match, capturedGroup) => {
        if (capturedGroup) {  // Если есть захваченная группа (текст внутри кавычек), вернуть её без изменений
            return capturedGroup;
        }
        return '';  // Иначе удалить пробелы
    });
}

const commaSplit = (string) => {
    let quote = {
        curlyOpen: 0,
        curlyClose: 0,
        squareOpen: 0,
        squareClose: 0
    }
    let res = [];
    let startElem = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === '[') {
            quote.squareOpen++;
        } else if (string[i] === ']') {
            quote.squareClose++;
        } else if (string[i] === '{') {
            quote.curlyOpen++;
        } else if (string[i] === '}') {
            quote.curlyClose++;
        }

        if ((string[i] === ',' || i === string.length - 1) && !(quote.squareOpen - quote.squareClose) && !(quote.curlyOpen - quote.curlyClose)) {
            if (i === string.length - 1) {
                res.push(string.slice(startElem, i + 1));
            } else {
                res.push(string.slice(startElem, i));
                startElem = i + 1;
            }
        }
    }

    return res;
}

export const stringToJson = (string) => {
    string = removeSpase(string);
    if (string[0] === '[') {
        return commaSplit(string.slice(1, -1)).reduce((acc, elem, index) => {
            acc.push(stringToJson(elem));
            return acc;
        }, []);
    } else if (string[0] === '{') {
        return commaSplit(string.slice(1, -1)).reduce((acc, elem, index) => {
            const dotsIndex = elem.indexOf(':');
            const key = elem.slice(1, dotsIndex-1);
            const value = elem.slice(dotsIndex+1);
            acc[key] = stringToJson(value);
            return acc;
        }, {});
    } else {
        const numericValue = parseFloat(string);
        if (string === 'false') {
            return false;
        } else if (string === 'true') {
            return true;
        } else if (string === 'null') {
            return null;
        } else if (!isNaN(numericValue)) {
            return numericValue;
        } else {
            return string.slice(1, -1);
        }
    }
}

console.log(JSON.parse('{"array": [1, 2, {"inArr": "fedor"}], "number": 666, "obj": {"name": 1}}'))
console.log(stringToJson('{"array": [1, 2, {"inArr": "fedor"}], "number": 666, "obj": {"name": 1}}'))
console.log(JSON.parse('"array"'))
