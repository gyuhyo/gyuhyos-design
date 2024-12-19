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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { createContext, useContext, useState } from "react";
var BackdropContext = createContext(undefined);
export var BackdropProvider = function (_a) {
    var children = _a.children;
    var _b = __read(useState(false), 2), isShow = _b[0], setIsShow = _b[1];
    return (_jsx(BackdropContext.Provider, __assign({ value: { isShow: isShow, setIsShow: setIsShow } }, { children: children })));
};
export var useBackdrop = function () {
    var context = useContext(BackdropContext);
    if (!context) {
        throw new Error("useBackdrop must be used within a BackdropProvider");
    }
    return context;
};
