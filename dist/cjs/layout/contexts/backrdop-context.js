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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBackdrop = exports.BackdropProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var BackdropContext = (0, react_1.createContext)(undefined);
var BackdropProvider = function (_a) {
    var children = _a.children;
    var _b = __read((0, react_1.useState)(false), 2), isShow = _b[0], setIsShow = _b[1];
    return ((0, jsx_runtime_1.jsx)(BackdropContext.Provider, __assign({ value: { isShow: isShow, setIsShow: setIsShow } }, { children: children })));
};
exports.BackdropProvider = BackdropProvider;
var useBackdrop = function () {
    var context = (0, react_1.useContext)(BackdropContext);
    if (!context) {
        throw new Error("useBackdrop must be used within a BackdropProvider");
    }
    return context;
};
exports.useBackdrop = useBackdrop;
