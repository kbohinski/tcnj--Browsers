/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-5-3
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Dr. Russo
 * Project Name:  Project 4
 * Description:   You are the JavaScript engineer on a project that is developing
 *                a new web application that applies a variety of filter effects
 *                to a user’s uploaded image. You have demonstrated that intensity
 *                transformation filters involving only pixel point operations
 *                (e.g. grayscale, brighten, sepia, …) have run times that are
 *                well within design specifications. Unfortunately, more complex
 *                filters involving the processing of a pixel region (e.g. median,
 *                sharpen, blur, …) take too long to complete and lock up the
 *                browser window in the process. To improve the experience of users
 *                applying these filters you have decided to split the image horizontally
 *                into roughly equal strips and divide the work amongst multiple Web Workers.
 *                The goal of this project is to demonstrate the viability of this idea using
 *                the median filter, which is frequently the most computationally intensive
 *                of all pixel region processing filters.
 *
 * Filename:      worker.js
 * Description:   A worker to manipulate ImageData.
 * Last Modified: 2016-5-3
 */

/* Uses ECMAScript's strict mode */
"use strict";

/**
 * On a new message to our worker, modify the image and reply.
 *
 * @param m : The incoming message
 */
self.onmessage = function (m) {
    /* Copy the image data */
    let k = m.data.imgData;
    let j = m.data.imgData;

    /**
     * Helper function to get the rgb values of a pixel at x, y.
     *
     * @param x : X coordinate
     * @param y : Y coordinate
     * @returns {{r: (*|Object), g: (*|Object), b: (*|Object)}} : Return the rgb values in a new object for the requested pixel.
     */
    function getPixelRGB(x, y) {
        return {
            r: k.data[((y * (k.width * 4)) + (x * 4))],
            g: k.data[((y * (k.width * 4)) + (x * 4)) + 1],
            b: k.data[((y * (k.width * 4)) + (x * 4)) + 2]
        };
    }

    /**
     * Helper function to save the rgb values of a pixel.
     *
     * @param x : X coordinate
     * @param y : Y coordinate
     * @param r : R value to save
     * @param g : G value to save
     * @param b : B value to save
     */
    function setPixelRGB(x, y, r, g, b) {
        j.data[((y * (k.width * 4)) + (x * 4))] = r;
        j.data[((y * (k.width * 4)) + (x * 4)) + 1] = g;
        j.data[((y * (k.width * 4)) + (x * 4)) + 2] = b;
    }

    /* Main for loop, goes through image by x, y and applies the median filter */
    for (let x = 0; x < m.data.imgData.width; x++) {
        for (let y = 0; y < m.data.imgData.height; y++) {

            /* Grab all neighbors and self */
            let neighbors = [];
            neighbors.push(getPixelRGB(x, y - 1));
            neighbors.push(getPixelRGB(x + 1, y - 1));
            neighbors.push(getPixelRGB(x + 1, y));
            neighbors.push(getPixelRGB(x + 1, y + 1));
            neighbors.push(getPixelRGB(x, y + 1));
            neighbors.push(getPixelRGB(x - 1, y + 1));
            neighbors.push(getPixelRGB(x - 1, y));
            neighbors.push(getPixelRGB(x - 1, y - 1));
            neighbors.push(getPixelRGB(x, y));

            /* Check to see if we hit a border */
            let check = false;
            for (let i = 0; i < neighbors.length; i++) {
                if (neighbors[i].r === undefined || neighbors[i].g === undefined || neighbors[i].b === undefined) {
                    check = true;
                    break;
                }
            }
            if (check) {
                setPixelRGB(x, y, getPixelRGB(x, y).r, getPixelRGB(x, y).g, getPixelRGB(x, y).b);
                continue;
            }

            /* Grab medians */

            neighbors.sort(function (a, b) {
                if (a.r < b.r) {
                    return -1;
                } else if (a.r > b.r) {
                    return 1;
                } else {
                    return 0;
                }
            });

            let median = Math.floor((neighbors.length - 1) / 2);

            let r = neighbors[median].r;

            neighbors.sort(function (a, b) {
                if (a.g < b.g) {
                    return -1;
                } else if (a.g > b.g) {
                    return 1;
                } else {
                    return 0;
                }
            });

            let g = neighbors[median].g;

            neighbors.sort(function (a, b) {
                if (a.b < b.b) {
                    return -1;
                } else if (a.b > b.b) {
                    return 1;
                } else {
                    return 0;
                }
            });

            let b = neighbors[median].b;

            setPixelRGB(x, y, r, g, b);
        }
    }

    /* Form reply message */
    let u = new Object({
        y: m.data.y,
        ey: m.data.ey,
        stripHeight: m.data.stripHeight,
        imgWidth: m.data.imgWidth,
        imgHeight: m.data.imgHeight,
        numWorkers: m.data.numWorkers,
        requestNum: m.data.requestNum,
        imgData: m.data.imgData,
        medianImgData: j
    });

    /* Respond */
    self.postMessage(u);

    self.close();
};