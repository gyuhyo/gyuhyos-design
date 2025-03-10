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
import "./split.container.css";
import React from "react";
var Split = React.lazy(function () {
    return import("@geoffcox/react-splitter").then(function (mod) { return ({ default: mod.Split }); });
});
var DevsSplitContainer = function (_a) {
    var _b = _a.align, align = _b === void 0 ? "column" : _b, defaultSize = _a.defaultSize, children = _a.children;
    var _c = __read(React.useState(false), 2), isMobile = _c[0], setIsMobile = _c[1];
    React.useEffect(function () {
        if (typeof window === "undefined")
            return;
        if (window.innerWidth <= 1200) {
            setIsMobile(true);
        }
        var browserResizing = function () {
            if (window.innerWidth <= 1200) {
                setIsMobile(true);
            }
            else {
                setIsMobile(false);
            }
        };
        window.addEventListener("resize", browserResizing);
        return function () { return window.removeEventListener("resize", browserResizing); };
    }, []);
    return (_jsx(React.Suspense, { children: _jsx(Split, __assign({ horizontal: isMobile ? true : align == "column" ? true : false, initialPrimarySize: defaultSize !== null && defaultSize !== void 0 ? defaultSize : "50%" }, { children: children })) }));
};
export default React.memo(DevsSplitContainer);
