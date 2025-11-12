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
exports.useGyudDt = exports.GyudDtProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
// CounterProvider.tsx
var react_1 = require("react");
var zustand_1 = require("zustand");
var hooks_1 = require("../hooks");
var GyudDtContext = (0, react_1.createContext)(null);
var GyudDtProvider = function (_a) {
    var children = _a.children, dataSource = _a.dataSource, columns = _a.columns, options = _a.options;
    var store = (0, hooks_1.useGyudInitialize)(dataSource, columns, options);
    return ((0, jsx_runtime_1.jsx)(GyudDtContext.Provider, __assign({ value: store }, { children: children })));
};
exports.GyudDtProvider = GyudDtProvider;
// hook
var useGyudDt = function (selector) {
    var store = (0, react_1.useContext)(GyudDtContext);
    if (!store)
        throw new Error("GyudDtProvider 안에서만 사용해야 함!");
    return (0, zustand_1.useStore)(store, selector);
};
exports.useGyudDt = useGyudDt;
