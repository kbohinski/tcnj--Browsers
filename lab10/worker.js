/**
 * @author Kevin Bohinski <bohinsk1@tcnj.edu>
 * @version 1.0
 * @since 2016-4-26
 *
 * Course:        CSC 470 - 03 (Topics: Advanced Browser Technologies)
 * Instructor:    Dr. Russo
 * Project Name:  Lab 10
 * Description:   • Load an image and draw it on a canvas.
 *                • Access and modify pixel data of the canvas context using the ImageData object.
 *                • Draw a modified ImageData object on a canvas.
 *                • Create and set up a new Web Worker object.
 *                • Post an ImageData object to a Web Worker.
 *                • Receive an ImageData object from a Web Worker.
 *
 * Filename:      worker.js
 * Description:   A worker to manipulate ImageData.
 * Last Modified: 2016-4-26
 */

/* Uses ECMAScript's strict mode */
"use strict";

/**
 * On a new message to our worker, modify the image and reply.
 * @param m : The incoming message
 */
self.onmessage = function (m) {
    /* Grab the image data */
    let data = m.data.data;

    /* Modify to grayscale */
    for (let i = 0; i < data.length; i += 4) {
        let grayscale = .299 * data[i] + .587 * data[i + 1] + .114 * data[i + 2];
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
    }

    /* Respond */
    self.postMessage(data);
};