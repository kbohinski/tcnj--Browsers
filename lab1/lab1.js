/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-2-2
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Prof. Russo
 * Project Name:  Lab 1
 * Description:   • Practice using JavaScript operators and global objects.
 *                • Practice using the FireFox development tools, including Scratchpad editor.
 *                • Write a single JavaScript program that performs four calculations.
 *
 * Filename:      lab1.js
 * Description:   Javascript script for Lab 1 to perform the four calculations.
 * Last Modified: 2016-2-2
 */

/* Uses ECMAScript's strict mode */
"use strict";

/* Runs calculation 1 */
var a = parseFloat(prompt("Please enter a value for \'A\'"));
var b = parseFloat(prompt("Please enter a value for \'B\'"));
var c = (Math.sqrt(((a * a) + (b * b))));
alert(c);

/* Runs calculation 2 */
var input = prompt("Please enter \'Total seconds\'.");
var totalSeconds = parseInt(input);
var hours = Math.floor((totalSeconds) / (60 * 60));
var minutes = Math.floor((totalSeconds % (60 * 60)) / (60));
var seconds = Math.ceil((totalSeconds % (60 * 60)) % 60);
alert(hours + " hours, " + minutes + " minutes, " + seconds + " seconds");

/* Runs calculation 3 */
var values = prompt("Please enter a comma separated string.");
alert((values.split(",").join(";")));

/* Runs calculation 4 */
var MILLISECONDS_IN_A_DAY = 86400000;
var dateStr = prompt("Please enter a date string.");
var date = Date.parse(dateStr);
date += MILLISECONDS_IN_A_DAY;
var date1 = new Date(date);
var date1Str = date1.toDateString();
alert(date1Str);