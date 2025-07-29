"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sideSettingSliderContainerStyle = void 0;
var react_1 = require("@emotion/react");
var sideSettingSliderContainerStyle = function (_a) {
    var opened = _a.opened, _b = _a.bgColor, bgColor = _b === void 0 ? "#fff" : _b;
    return (0, react_1.css)({
        position: "absolute",
        zIndex: 9999,
        width: "280px",
        height: "100dvh",
        top: 0,
        right: opened ? "0px" : "-280px",
        transition: "right 300ms ease-in-out",
        background: "rgb(var(--background-color))",
    });
};
exports.sideSettingSliderContainerStyle = sideSettingSliderContainerStyle;
