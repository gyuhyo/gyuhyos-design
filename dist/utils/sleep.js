export var sleep = function (time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};
