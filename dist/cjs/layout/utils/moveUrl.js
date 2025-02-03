"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveUrl = exports.setDefaultTitle = void 0;
var defaultTitle = "";
var setDefaultTitle = function (title) {
    defaultTitle = title.trim();
};
exports.setDefaultTitle = setDefaultTitle;
var moveUrl = function (url, title) {
    var assignTitle = typeof window === undefined || defaultTitle === ""
        ? ""
        : "".concat(defaultTitle, " ");
    window.history.pushState({ gm: url }, "".concat(assignTitle, "MES - ").concat(title), "/?gm=".concat(encodeURIComponent(url)));
    document.title = "".concat(assignTitle, "MES - ").concat(title);
};
exports.moveUrl = moveUrl;
