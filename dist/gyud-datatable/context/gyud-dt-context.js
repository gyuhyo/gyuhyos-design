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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// CounterProvider.tsx
import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { useGyudInitialize } from "../hooks";
var GyudDtContext = createContext(null);
export var GyudDtProvider = function (_a) {
    var children = _a.children, dataSource = _a.dataSource, columns = _a.columns, options = _a.options;
    var store = useGyudInitialize(dataSource, columns, options);
    return (_jsx(GyudDtContext.Provider, __assign({ value: store }, { children: children })));
};
// hook
export var useGyudDt = function (selector) {
    var store = useContext(GyudDtContext);
    if (!store)
        throw new Error("GyudDtProvider 안에서만 사용해야 함!");
    return useStore(store, selector);
};
