/*
    Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета
    площади и периметра. Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник,
    круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.
*/

class Shape {
    // если метод не задан в подклассе, будет вызван родительский класс, и выведется ошибка.
    getArea() {
        throw new Error('Shape: the method "getArea" must be implemented in a subclass');
    }

    getPerimeter() {
        throw new Error('Shape: the method "getPerimeter" must be implemented in a subclass');
    }
}

class Rectangle extends Shape {
    /**
     * @param width - ширина прямоугольника
     * @param height - высота прямоугольника
     */
    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
    }

    // возвращается площадь прямоугольника
    getArea() {
        return this._height * this._width;
    }

    // возвращается периметр прямоугольника
    getPerimeter() {
        return 2 * (this._height + this._width);
    }
}

class Circle extends Shape {
    /**
     * @param radius - радиус круга
     */
    constructor(radius) {
        super();
        this._radius = radius;
    }

    // возвращается площадь круга pi*R^2
    getArea() {
        return Math.PI * this._radius * this._radius;
    }

    // возвращается периметр круга 2*pi*R
    getPerimeter() {
        return 2 * Math.PI * this._radius;
    }
}

class Triangle extends Shape {
    /**
     * @param sideA - первая сторона треугольника
     * @param sideB - вторая сторона треугольника
     * @param angle - угл между сторонами в градусах
     */
    constructor(sideA, sideB, angle) {
        super();
        this._sideA = sideA;
        this._sideB = sideB;
        this._angle = angle;
    }

    // возвращается площадь треугольника по двум сторонам и углу между ними
    getArea() {
        return 0.5 * this._sideA * this._sideB * Math.sin((this._angle * Math.PI) / 180);
    }

    // возвращается периметр треугольника по теореме косинусов
    getPerimeter() {
        return this._sideA + this._sideB + Math.sqrt(this._sideA**2 + this._sideB**2 - 2 * this._sideA * this._sideB * Math.cos((this._angle * Math.PI) / 180));
    }
}

const r = new Triangle(12, 13, 45);

console.log(r.getArea())
console.log(r.getPerimeter())
