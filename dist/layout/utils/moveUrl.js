var defaultTitle = "";
export var setDefaultTitle = function (title) { return (defaultTitle = title); };
export var moveUrl = function (url, title) {
    var assignTitle = defaultTitle === "" ? "" : "".concat(defaultTitle, " ");
    window.history.pushState({ gm: url }, "".concat(assignTitle, "MES - ").concat(title), "/?gm=".concat(encodeURIComponent(url)));
    document.title = "".concat(assignTitle, "MES - ").concat(title);
};
