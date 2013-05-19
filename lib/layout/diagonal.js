module.exports = (function () {
    'use strict';

    var _ = require('underscore');

    function sumUp(sum, value) {
        return sum + value;
    }

    return function generateLayout(images, options, callback) {
        var defaults = {
                padding: 0
            };

        if (_(options).isFunction()) {
            callback = options;
            options = {};
        }

        _.defaults(options, defaults);

        images = _(images).map(function (image, it) {
            return _.extend(image, {
                x: it === 0 ? 0 : _(images).chain().pluck('width').first(it).reduce(sumUp).value() + options.padding * it,
                y: it === 0 ? 0 : _(images).chain().pluck('height').first(it).reduce(sumUp).value() + options.padding * it
            });
        });

        callback(undefined, {
            width: _(images).chain().pluck('width').reduce(sumUp).value() + options.padding * (images.length - 1),
            height: _(images).chain().pluck('height').reduce(sumUp).value() + options.padding * (images.length - 1),
            images: images
        });
    };
}());