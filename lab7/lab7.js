/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-3-31
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Prof. Russo
 * Project Name:  Lab 7
 * Description:   • Define custom classes
 *                • Setup prototype hierarchies
 *                • Instantiate and make use of custom classes that benefit from prototypal inheritance
 *
 * Filename:      lab7.js
 * Description:   JS file with classes and prototypes.
 * Last Modified: 2016-3-31
 */

/* Uses ECMAScript's strict mode */
"use strict";

/*
 * The following implementation uses the ECMAScript 6 way of implimenting prototype based classes.
 */

/* Shape constructor function */
class Shape {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    getName() {
        return this.name;
    }
}

/* Rectangle constructor function */
class Rectangle extends Shape {
    constructor(name, width, height) {
        super(name, width, height);
    }

    getArea() {
        return this.width * this.height;
    }
}

/* Square constructor function */
class Square extends Rectangle {
    constructor(name, size) {
        super(name, size, size);
    }
}

/* Tests */
let r = new Rectangle('rectangle1', 10, 20);
console.log(r.getName(), 'has area', r.getArea());
let s = new Square('square1', 30);
console.log(s.getName(), 'has area', s.getArea());