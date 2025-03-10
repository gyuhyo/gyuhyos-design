"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sideMenuContainerStyle = void 0;
var react_1 = require("@emotion/react");
var sideMenuContainerStyle = function (_a) {
    var opened = _a.opened, _b = _a.bgColor, bgColor = _b === void 0 ? "linear-gradient(217deg, rgb(1 11 25), rgba(255, 0, 0, 0) 100%),\n  linear-gradient(127deg, rgb(85 109 124), rgba(0, 255, 0, 0) 100%),\n  linear-gradient(336deg, rgb(54 68 105), rgba(0, 0, 255, 0) 100%)" : _b;
    return (0, react_1.css)({
        position: "sticky",
        flex: "none",
        width: opened ? "250px" : "55px",
        height: "100dvh",
        top: 0,
        transition: "width 300ms ease-in-out",
        background: bgColor,
        color: "#fff",
        zIndex: 4,
    });
};
exports.sideMenuContainerStyle = sideMenuContainerStyle;
