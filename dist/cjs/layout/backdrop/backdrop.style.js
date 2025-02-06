"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACK_DROP_STYLE = void 0;
var react_1 = require("@emotion/react");
var BACK_DROP_STYLE = function (_a) {
    var _b = _a.show, show = _b === void 0 ? false : _b, styles = _a.styles;
    return (0, react_1.css)(__assign({ width: "100vw", height: "100vh", overflow: "hidden", background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(3px)", opacity: show ? 1 : 0, position: "absolute", left: 0, top: 0, transitionDuration: "300ms", transitionProperty: "opacity", zIndex: 9998, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }, styles));
};
exports.BACK_DROP_STYLE = BACK_DROP_STYLE;
