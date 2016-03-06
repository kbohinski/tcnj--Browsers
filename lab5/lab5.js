/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-3-6
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Prof. Russo
 * Project Name:  Lab 5
 * Description:   • Practice using Array iteration methods to perform compact computations.
 *
 * Filename:      lab5.js
 * Description:   JS file to perform calculations.
 * Last Modified: 2016-3-6
 */

/* Uses ECMAScript's strict mode */
"use strict";

/*
 * Part 1
 *   • Compute number of men over 50 in the Haverbeke family.
 *   • Compute number of women over 50 in the Haverbeke family.
 *   • Compute number of men under 50 in the Haverbeke family.
 *   • Compute number of women under 50 in the Haverbeke family.
 *
 *   • All four calculations must be performed with a single statement using filter() and map().
 */

/**
 * Helper function for filter()
 * Returns true if the ancestor's age is over 50
 *
 * @param p : Single entry from ancestry.js
 * @returns {boolean} : True if over 50, else false.
 */
function over50(p) {
    return (p.died - p.born) > 50;
}

/**
 * Helper function for filter()
 * Returns true if the ancestor is male
 *
 * @param p : Single entry from ancestry.js
 * @returns {boolean} : True if male, else false.
 */
function male(p) {
    return p.sex === 'm';
}

/* Performs filter operations */
console.log('men over 50     : ' + ancestry.filter(over50).filter(male).length);
console.log('women over 50   : ' + ancestry.filter(over50).filter(function (p) {
        return !male(p);
    }).length);
console.log('men under 50    : ' + ancestry.filter(function (p) {
        return !over50(p);
    }).filter(male).length);
console.log('women under 50  : ' + ancestry.filter(function (p) {
        return !over50(p);
    }).filter(function (p) {
        return !male(p);
    }).length);

/*
 * Part 2
 *   • Compute mean of the ages of all men
 *   • Compute mean of the ages of all women
 *   • Compute stdev of the ages of all men
 *   • Compute stdev of the ages of all women
 */

/**
 * Calculates standard deviation
 * @param ages : Entries from ancestry.js
 * @param mean : Average of ages
 * @returns {number} : Standard deviation
 */
function stdev(ages, mean) {
    return Math.sqrt((ages.map(function (p) {
        return ((p.died - p.born) - mean);
    }).reduce(function (prev, val, index) {
        return (val * val) + prev;
    }, 0) / (ages.length - 1)));
}

console.log('male ave age    : ' + ave_age.ave_male_age);
console.log('male stdev      : ' + stdev(ancestry.filter(male), ave_age.ave_male_age));

console.log('female ave age  : ' + ave_age.ave_female_age);
console.log('female stdev    : ' + stdev(ancestry.filter(function (p) {
        return !male(p);
    }), ave_age.ave_female_age));