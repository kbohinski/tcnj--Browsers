// ave_age.js
var ave_age = (function () {

    // Add two numbers
    function plus(a, b) {
        return a + b;
    };

    // Compute the average of an array
    function ave(arr) {
        return arr.reduce(plus) / arr.length;
    }

    // Compute age
    function age(p) {
        return p.died - p.born;
    }

    // Test for a male
    function male(p) {
        return p.sex == "m";
    }

    // Test for a female
    function female(p) {
        return p.sex == "f";
    }

    // Compute average age of male and female members
    var ave_male_age = ave(ancestry.filter(male).map(age));
    var ave_female_age = ave(ancestry.filter(female).map(age));

    /* Return public interface */
    return {
        ave : ave,
        ave_male_age: ave_male_age,
        ave_female_age: ave_female_age
    }

})();
