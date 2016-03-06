/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-2-21
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Prof. Russo
 * Project Name:  Project 1
 * Description:   Monte Hall Simulator
 *
 * Filename:      project1.js
 * Description:   Javascript script for Project 1.
 * Last Modified: 2016-2-21
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
 * Uses the 'Durstenfeld' shuffle algorithm to shuffle the array.
 * Extends the array prototype so this can be used on any array.
 */
Array.prototype.shuffle = function () {
    /* Loop runs backwards for efficiency, skips last element */
    for (var i = (this.length - 1); i > 0; i--) {
        /* Obtain random element index */
        var u = Math.floor((i + 1) * Math.random());

        /* Swap two array values based on the random above */
        var tmp = this[i];
        this[i] = this[u];
        this[u] = tmp;
    }
};

/**
 * Driver method for play(), keeps track of when it is beneficial to switch or stay, as per spec.
 * @param numRuns : Number of times to run the simulation.
 */
function simulate(numRuns) {
    /* Variables to keep track of when it is beneficial to switch or stay, as per spec. */
    var nstay = 0;
    var nswitch = 0;

    /**
     * Runs a simulation of the Monty Hall Problem
     */
    function play() {
        /* Create doors array as per spec */
        var doors = ["goat", "goat", "car"];

        /* Shuffle array to introduce randomness */
        doors.shuffle();
        console.log(doors);

        /* Act as the contestant and randomly pick a door */
        var contestantOriginalSelection = randomInt(0, 2);

        /* Find first goat door */
        var goatIndex = 0;
        for (var i = 0; i < doors.length; i++) {
            if (doors[i] === "goat" && i !== contestantOriginalSelection) {
                goatIndex = i;
                break;
            }
        }

        /* Find unselected num */
        var unselectedIndex = 0;
        for (var i = 0; i < doors.length; i++) {
            if (i !== contestantOriginalSelection && i !== goatIndex) {
                unselectedIndex = i;
                break;
            }
        }

        /* Increment the counters */
        if (doors[contestantOriginalSelection] === "car") {
            nstay++;
        } else if (doors[unselectedIndex] === "car") {
            nswitch++;
        }
    }

    var runCount = numRuns;
    while (runCount > 0) {
        play();
        runCount--;
    }

    console.log("Beneficial to stay:   " + nstay / numRuns);
    console.log("Beneficial to switch: " + nswitch / numRuns);
}

simulate(100000);