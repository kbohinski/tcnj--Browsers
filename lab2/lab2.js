/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-2-10
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Prof. Russo
 * Project Name:  Lab 2
 * Description:   • Practice using JavaScript iteration, conditionals, custom functions, error handling, function scope.
 *                • Continue practice using the FireFox development tools, including Scratchpad editor, Debugger and Console.
 *
 * Filename:      lab2.js
 * Description:   Javascript script for Lab 2.
 * Last Modified: 2016-2-10
 */

/* Uses ECMAScript's strict mode */
"use strict";

/**
 * Problem 1
 * calc1()
 *
 * Reworks some problems from lab1.
 */
function calc1() {
    /* Create two empty strings for prompt */
    var a = "";
    var b = "";

    /* While the string is empty, keep asking for a value to store. */
    while (a == "") {
        /* Show prompt box */
        a = prompt("Please enter a value for \'A\'");

        /* Perform checks on the string */
        if (a == null) {
            /* As per spec, if null, just return */
            return;
        } else if (isNaN(a)) {
            /* As per spec, if not a number, alert user and prompt them again. */
            alert("Oops! You didn't enter a number! Try again.");
            /* Set string to empty string, so the while loop triggers again. */
            a = "";
        } else if (0 > parseFloat(a)) {
            /* As per spec, if a negative number, alert user and prompt them again. */
            alert("Oops! The number you entered is negative! Try again.");
            /* Set string to empty string, so the while loop triggers again. */
            a = "";
        }
    }

    /* Perform same loop as a for b */
    while (b == "") {
        b = prompt("Please enter a value for \'B\'");
        if (b == null) {
            return;
        } else if (isNaN(b)) {
            alert("Oops! You didn't enter a number! Try again.");
            b = "";
        } else if (0 > parseFloat(b)) {
            alert("Oops! The number you entered is negative! Try again.");
            b = "";
        }
    }

    /* As per spec, calculate pythagorean and alert it to the user */
    alert(Math.sqrt(((parseFloat(a) * parseFloat(a)) + (parseFloat(b) * parseFloat(b)))));
}

/**
 * Problem 1
 * calc3()
 *
 * Reworks some problems from lab1.
 */
function calc3() {
    /* Create empty string for prompt */
    var values = "";

    /* While the string is empty, keep asking for a value to store. */
    while (values == "") {
        /* Show prompt box */
        values = prompt("Please enter a comma separated string.");

        /* Perform checks on the string */
        if (values == null) {
            /* As per spec, if null, just return */
            return;
        }
        if (values.split(",").length == 1) {
            /* As per spec, if only length of one after split, alert user and prompt them again. */
            alert("Oops! Two or more comma separated values must be given! Try again.");
            /* Set string to empty string, so the while loop triggers again. */
            values = "";
        }
    }

    /* As per spec, split by comma then join by semicolon */
    alert((values.split(",").join(";")));
}

/* Run problem 1 */
calc1();
calc3();

/**
 * Problem 2
 * makeCounter()
 *
 * Create a method with nested methods to demonstrate closures and the scope chain.
 *
 * @returns An object containing two methods that demonstrate closures as per spec.
 */
function makeCounter() {
    /* Create empty object for purpose of attaching methods, later to return */
    var o = Object();

    /* Create count variable to use in the scope chain */
    var count = 0;

    /**
     * addCount()
     * Adds the param 'n' to the count variable that lies in the scope chain.
     * Attached to the object to return.
     *
     * @param n : Number to add to the count.
     */
    o.addCount = function addCount(n) {
        count += n;
    };

    /**
     * getCount()
     * Returns the count variable that lies in the scope chain.
     * Attached to the object to return.
     *
     * @returns {number}
     */
    o.getCount = function getCount() {
        return count;
    };

    /* Return object with the two methods attached */
    return o;
}

/* Run provided test cases for problem 2 */
var counter = makeCounter();
console.log(counter.getCount() + ", Expected 0");
counter.addCount(1);
console.log(counter.getCount() + ", Expected 1");
counter.addCount(2);
console.log(counter.getCount() + ", Expected 3");