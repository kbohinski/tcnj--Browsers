/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-4-15
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Dr. Russo
 * Project Name:  Project 3
 * Description:   • Create a JavaScript file named shapes.js that implements several Shape object constructor functions.
 *
 * Filename:      Shapes.js
 * Description:   Javascript implementation file.
 * Last Modified: 2016-4-15
 */

/* Uses ECMAScript's strict mode */
"use strict";

/**
 * Returns a random int between max, min (inclusive of both).
 * @param max   : High Bound
 * @param min   : Low Bound
 * @returns {*} : (Number) Random int between (or including) max, min.
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper function to convert from degrees to radians.
 * @param degrees    : Degrees representation of angle to convert.
 * @returns {number} : Radian representation of angle after conversion.
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/*
 * The following implementation uses the ECMAScript 6 way of implementing prototype based classes.
 */

/* Shape constructor function */
class Shape {
    constructor() {
        this.fillStyle = 'rgb(' + randomInt(0, 255) + ',' + randomInt(0, 255) + ',' + randomInt(0, 255) + ')';
        this.strokeStyle = 'rgb(' + randomInt(0, 255) + ',' + randomInt(0, 255) + ',' + randomInt(0, 255) + ')';
        this.lineWidth = randomInt(5, 50);
    }

    draw(ctx) {
        this.trace(ctx);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        if (this.strokeStyle === undefined || this.lineWidth === undefined) {

        } else {
            ctx.stroke();
        }
        ctx.fillStyle = this.fillStyle;
        if (this.fillStyle !== undefined) {
            ctx.fill();
        }
    }

    toString() {
        return 'Shape: [fillStyle=' + this.fillStyle + ' strokestyle=' + this.strokeStyle + ' lineWidth=' + this.lineWidth + ']';
    }
}

/* Line constructor function */
class Line extends Shape {
    constructor(x1, y1, x2, y2) {
        super();
        this.startPt = {x: x1, y: y1};
        this.endPt = {x: x2, y: y2};
    }

    trace(ctx) {
        ctx.beginPath();
        ctx.lineTo(this.startPt.x, this.startPt.y);
        ctx.lineTo(this.endPt.x, this.endPt.y);
        ctx.closePath();
    }

    toString() {
        return 'Line: [startPt=' + JSON.stringify(this.startPt) + ' endPt=' + JSON.stringify(this.endPt) + ' fillStyle=' + this.fillStyle + ' strokestyle=' + this.strokeStyle + ' lineWidth=' + this.lineWidth + ']';
    }
}

/* Rectangle constructor function */
class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super();
        this.upperLeft = {x: x, y: y};
        this.width = w;
        this.height = h;
    }

    trace(ctx) {
        ctx.beginPath();
        ctx.rect(this.upperLeft.x, this.upperLeft.y, this.width, this.height);
        ctx.closePath();
    }

    toString() {
        return 'Rectangle: [upperLeft=' + JSON.stringify(this.upperLeft) + ' width=' + this.width + ' height=' + this.height + ' fillStyle=' + this.fillStyle + ' strokestyle=' + this.strokeStyle + ' lineWidth=' + this.lineWidth + ']';
    }
}

/* Eclipse constructor function */
class Eclipse extends Shape {
    constructor(cx, cy, rx, ry) {
        super();
        this.center = {x: cx, y: cy};
        this.radius = {x: rx, y: ry};
    }

    trace(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.center.x, this.center.y - this.radius.y / 2);
        ctx.bezierCurveTo(this.center.x + this.radius.x / 2, this.center.y - this.radius.y / 2, this.center.x + this.radius.x / 2, this.center.y + this.radius.y / 2, this.center.x, this.center.y + this.radius.y / 2);
        ctx.bezierCurveTo(this.center.x - this.radius.x / 2, this.center.y + this.radius.y / 2, this.center.x - this.radius.x / 2, this.center.y - this.radius.y / 2, this.center.x, this.center.y - this.radius.y / 2);
        ctx.closePath();
    }

    toString() {
        return 'Eclipse : [center=' + JSON.stringify(this.center) + ' radius=' + JSON.stringify(this.radius) + ' fillStyle=' + this.fillStyle + ' strokestyle=' + this.strokeStyle + ' lineWidth=' + this.lineWidth + ']';
    }
}

/* Polygon constructor function */
class Polygon extends Shape {
    constructor(cx, cy, radius, nPoints) {
        super();
        this.center = {x: cx, y: cy};
        this.radius = radius;
        this.nPoints = nPoints;
    }

    trace(ctx) {
        /* Setup some vars for the loop */
        let theta = degreesToRadians(-90);
        let delta = degreesToRadians(360 / this.nPoints);

        /* Begin the poly line */
        ctx.beginPath();

        /* Iterate for the number of inner and outer points */
        for (let i = 0; i < this.nPoints; i++) {
            /* If inner / outer point */
            theta += delta;

            /* Add point to poly line */
            ctx.lineTo(this.radius * Math.cos(theta) + this.center.x, this.radius * Math.sin(theta) + this.center.y);
        }

        /* Finish poly line */
        ctx.closePath();
    }

    toString() {
        return 'Polygon : [center=' + JSON.stringify(this.center) + ' radius=' + this.radius + ' nPoints=' + this.nPoints + ' fillStyle=' + this.fillStyle + ' strokestyle=' + this.strokeStyle + ' lineWidth=' + this.lineWidth + ']';
    }
}

/* Polygon constructor function */
class Star extends Shape {
    constructor(cx, cy, radius, nPoints) {
        super();
        this.center = {x: cx, y: cy};
        this.radius = radius;
        this.nPoints = nPoints;
    }

    trace(ctx) {
        /* Setup some vars for the loop */
        let theta = degreesToRadians(-90);
        let delta = degreesToRadians(360 / (2 * this.nPoints));
        let r = 0;

        /* Begin the poly line */
        ctx.beginPath();

        /* Iterate for the number of inner and outer points */
        for (let i = 0; i < (2 * this.nPoints); i++) {
            /* If inner / outer point */
            theta += delta;
            if (i % 2 === 0) {
                r = .5 * this.radius;
            } else {
                r = this.radius;
            }
            /* Add point to poly line */
            ctx.lineTo(r * Math.cos(theta) + this.center.x, r * Math.sin(theta) + this.center.y);
        }

        /* Finish poly line */
        ctx.closePath();
    }

    toString() {
        return 'Star : [center=' + JSON.stringify(this.center) + ' radius=' + this.radius + ' nPoints=' + this.nPoints + ' fillStyle=' + this.fillStyle + ' strokestyle=' + this.strokeStyle + ' lineWidth=' + this.lineWidth + ']';
    }
}