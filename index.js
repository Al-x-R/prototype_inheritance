'use strict';

function MyArray() {
    if (!new.target) {
        return new MyArray(...arguments);
    }
    this.length = 0;
    for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
    }
    this.isMyArray = function isMyArray() {
        return (this instanceof MyArray);
    }
}

const myArr = new MyArray()

myArr.push = function push() {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i]
    }
    return this.length
}

myArr.find = function find(callback) {
    let elem
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            elem = this[i]
            break
        }
    }
    return elem
}

myArr.includes = function includes(elemToFind, index = 0) {
    if (index < 0) {
        index = this.length + index;
    }
    for (let i = index; i < this.length; i++) {
        if (this[i] === elemToFind) {
            return true;
        }
    }
    return false;
}

myArr.join = function join(separator = ',') {
    let string = '';
    for (let i = 0; i < this.length - 1; i++) {
        string = string + String(this[i]) + separator
    }
    string = string + String(this[this.length - 1])
    return string
}

myArr.filter = function filter(callback) {
    const myArr = new MyArray()
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            myArr.push(this[i])
        }
    }
    return myArr
}

myArr.map = function map(callback) {
    const myArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
        myArr.push(callback(this[i], i, this))
    }
    return myArr
}

myArr.reduce = function reduce(callback, initialValue) {
    let counterStart;
    let accumulator;
    if (initialValue === undefined) {
        counterStart = 1;
        accumulator = this[0]
    } else {
        counterStart = 0;
        accumulator = initialValue
    }
    for (let i = counterStart; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this)
    }
    return accumulator
}

myArr.pop = function pop() {
    const lastElement = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return lastElement;
}

myArr.concat = function concat() {
    const newArr = new this.constructor()
    for (let i = 0; i < this.length; i++) {
        newArr.push(this[i])
    }
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].isMyArray || arguments[i].constructor === Array) {
            for (let j = 0; j < arguments[i].length; j++) {
                newArr.push(arguments[i][j])
            }
        }
    }
    return newArr
}

myArr.flat = function flat(depth = 1) {
    let myArray = new this.constructor()
    for (let i = 0; i < this.length; i++) {
        myArray = myArray.concat(this[i])
    }
    if (--depth > 0) {
        myArray = myArray.flat()
    }
    return myArray
}