var defaultTitle = "";
export var setDefaultTitle = function (title) {
    defaultTitle = title.trim();
};
export var moveUrl = function (url, title) {
    var assignTitle = typeof window === undefined || defaultTitle === ""
        ? ""
        : "".concat(defaultTitle, " ");
    window.history.pushState({ gm: url }, "".concat(assignTitle, "MES - ").concat(title), "/?gm=".concat(encodeURIComponent(url)));
    document.title = "".concat(assignTitle, "MES - ").concat(title);
};
