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
import "./split.container.css";
import React from "react";
var Split = React.lazy(function () {
    return import("@geoffcox/react-splitter").then(function (mod) { return ({ default: mod.Split }); });
});
var DevsSplitContainer = function (_a) {
    var _b = _a.align, align = _b === void 0 ? "column" : _b, defaultSize = _a.defaultSize, children = _a.children;
    return (_jsx(React.Suspense, { children: _jsx(Split, __assign({ horizontal: align == "column" ? true : false, initialPrimarySize: defaultSize !== null && defaultSize !== void 0 ? defaultSize : "50%" }, { children: children })) }));
};
export default React.memo(DevsSplitContainer);
